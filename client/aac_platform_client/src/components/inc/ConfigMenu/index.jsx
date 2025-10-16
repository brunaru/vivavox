import { useCell } from '../../contexts/CellContext';
import ConfigHeader from '../ConfigHeader';
import Input from '../Input';
import ConfirmButton from '../ConfirmButton';
import ColorPicker from '../ColorPicker';
import ConfigCellSelector from '../ConfigCellSelector';
import Button from '../Button';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';
import api from '../../../services/api';
import { useS3Upload } from '../../hooks/useS3Upload';
import {
  ConfigMenuContainer,
  ConfigCellContainer,
  SettingsContainer,
  ConfigCellForm
} from './styled';
import BoardMenu from '../BoardMenu';


function ConfigMenu() {
  const {configCell, setConfigCell} = useCell();
  const {board, setBoard, configBoard} = useBoard();
  const [text, setText] = useState(configCell?.text || '');
  const [color, setColor] = useState(configCell?.color || '#000000');
  const [image, setImage] = useState(configCell?.img || '');
  const [id, setId] = useState(configCell?._id || '');
  const [pictograms, setPictograms] = useState([]);
  const [activeConfigMenu, setActiveConfigMenu] = useState(configBoard);
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadFile, deleteFile } = useS3Upload();
  const [loading, setLoading] = useState(false);

  const getPictogramsByText = useCallback(() => {
    if(!text.trim()) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.arasaac.org/v1/pictograms/pt/search/${text}`);
        setPictograms(response.data);
      } catch(error) {
        console.log("Error searching for pictograms", error);
      }
    };

    // Waits 500ms before fetch:
    const delay = setTimeout(fetchData, 500);

    // Cancels requisition if 'text' changes before 500ms:
    return () => clearTimeout(delay);
  }, [text]);

  function isTempUrl(url) {
    return url.startsWith("blob:");
  }

  function isS3Url(url) {
    try {
      const parsed = new URL(url);
      return parsed.hostname.includes(".s3.") && parsed.hostname.endsWith("amazonaws.com");
    } catch {
      return false;
    }
  }

  async function updateCellAndBoard() {
    if (loading) return;
    setLoading(true);
    
    try {
      if(!configCell) return;

      let finalImageUrl = image;

      // If the user selected a local file (temp URL) → upload it
      if (isTempUrl(image) && selectedFile) {
        try {
          // Upload the new image
          finalImageUrl = await uploadFile(selectedFile);
          setImage(finalImageUrl);
          console.log("Upload concluído");
        } catch (err) {
          console.error("Erro no upload:", err);
          return;
        }
      }


      if(id !== configCell._id) {
        console.log("Colocando célula no board:", configCell);

        // Adicionando NOVA célula no board:
        if(configCell.indexOnBoard >= board.cells.length) {
          let newBoard = {...board};
          const newCell = {
            ...configCell
          }
          newBoard.cells.push(newCell);
          console.log("Board com célula adicionada:", newBoard.cells);
          setBoard(newBoard);
        } else {
          // Create a new 'cells' array using map for immutability
          const updatedCells = board.cells.map((cell, index) => {
            // If this is the cell to update
            if (index === configCell.indexOnBoard) {
              // Return a *new* cell object with the changes
              return {
                ...configCell
              };
            }
            // Otherwise, return the cell unchanged
            return cell;
          });

          // Update the board state with the new cells array
          setBoard({
            ...board, // Keep other board properties (_id, name, etc.)
            cells: updatedCells // Assign the completely new array
          });
        }
      } else {
        // Verify if cell changes has been made:
        const hasChanges = 
        text !== configCell.text || 
        color !== configCell.color ||
        image !== configCell.img;

        // Make updates to the cell and board:
        if(hasChanges) {
          // If the image was changed and the old image is in S3 → delete the old one
          if (isS3Url(configCell.img)) {
            try{
              await deleteFile(configCell.img);
              console.log("Imagem antiga deletada");
            } catch (error) {
              console.error("Erro ao deletar imagem antiga:", error);
            }  
          }

          const updatedCell = { ...configCell, text: text, color: color, img: finalImageUrl };
          const response = await api.patch(`/userCell/patch/${updatedCell._id}`, updatedCell);
          console.log("Cell successfully sent to api");

          const newCellId = response.data.finalId;

          setBoard((prevBoard) => ({
            ...prevBoard,
            cells: prevBoard.cells.map((cell) => 
              cell._id === updatedCell._id ? { ...cell, _id: newCellId, cellType: "userCell" } : cell
            )
          }));

          console.log("AAAAAAA");
        } else {
          console.log("No change has been made");
        }
      }

      setConfigCell(null);
    } catch(error) {
      console.log("Error sending cell personalization: ", error);
    } finally {
      setLoading(false);
    }
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleColorChange(e) {
    setColor(e.target.value);
  }

  function removeCell() {
    if(!configCell) return;

    // The cell in question EXISTS:
    if(configCell.indexOnBoard < board.cells.length) {
      let newBoard = {...board};
      // Remove from the cell array:
      newBoard.cells.splice(configCell.indexOnBoard, 1);
      setBoard(newBoard);
    }
    setConfigCell(null);
  }
  
  useEffect(() => {
    getPictogramsByText();
  }, [text, getPictogramsByText]);

  return (
    <ConfigMenuContainer>
      <ConfigHeader 
        text1="Célula" 
        text2="Prancha"
        activeMenu={activeConfigMenu}
        setActiveMenu={setActiveConfigMenu}
      />
      {
        (!activeConfigMenu &&
        <ConfigCellContainer>
          <SettingsContainer>
            <ConfigCellForm>
              <Input text={text} handleTextChange={handleTextChange} label="Texto" />
              <ColorPicker color={color} handleColorChange={handleColorChange} label="Cor da borda"/>
              <Button onClick={removeCell} width="120px" height="30px" text="Remover célula" fontSize="14px"/>
            </ConfigCellForm>
            <ConfigCellSelector
              pictograms={pictograms}
              image={image}
              setImage={setImage}
              onFileSelect={setSelectedFile}
            />
          </SettingsContainer>
          <ConfirmButton 
            updateCell={updateCellAndBoard}
            text={loading ? "Salvando..." : "Confirmar"}
            height="40px" 
            width="180px" 
            margin="60px 0 60px 0"
            disabled={loading}
          />
        </ConfigCellContainer>) || 
        (activeConfigMenu && 
          <BoardMenu/>
        )
      }
    </ConfigMenuContainer>
  );
}

export default ConfigMenu;