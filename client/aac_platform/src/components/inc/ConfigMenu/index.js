import { useCell } from '../../contexts/CellContext';
import ConfigHeader from '../ConfigHeader';
import Input from '../Input';
import ConfirmButton from '../ConfirmButton';
import Symbol from '../Symbol';
import {
  ConfigMenuContainer,
  ConfigCellContainer,
  SettingsContainer,
  ConfigCellForm,
  ConfigCellPictograms,
  PictogramItem
} from './styled';
import ColorPicker from '../ColorPicker';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';

function ConfigMenu() {
  const {configCell, setConfigCell} = useCell();
  const {board, setBoard} = useBoard();
  const [text, setText] = useState(configCell.text);
  const [color, setColor] = useState(configCell.color);
  const [image, setImage] = useState(configCell.img);
  const [pictograms, setPictograms] = useState([]);
  const pictogramUrlPrefix = 'https://static.arasaac.org/pictograms/';

  async function updateCellAndBoard() {
    try {
      // Verify if cell changes has been made:
      const hasChanges = 
        text !== configCell.text || 
        color !== configCell.color ||
        image !== configCell.img;

      // Make updates to the cell and board:
      if(hasChanges) {
        const updatedCell = { ...configCell, text: text, color: color, img: image };
        const response = await axios.patch(`http://localhost:3001/userCell/patch/${updatedCell._id}`, updatedCell);
        console.log("Cell successfully sent to api");

        const newCellId = response.data.finalId;

        setBoard((prevBoard) => ({
          ...prevBoard,
          cells: prevBoard.cells.map((cell) => 
            cell._id === updatedCell._id ? { ...cell, _id: newCellId, cellType: "userCell" } : cell
          )
        }));
      } else {
        console.log("No change has been made");
      }

      setConfigCell(null);
    } catch(error) {
      console.log("Error sending cell update: ", error);
    }
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleColorChange(e) {
    setColor(e.target.value);
  }

  function handlePictogramClick(pictogram_id) {
    const selectedImg = `${pictogramUrlPrefix}${pictogram_id}/${pictogram_id}_300.png`;
    setImage(selectedImg);
  }

  async function getPictogramsByText() {
    try {
      const response = await axios.get(`https://api.arasaac.org/v1/pictograms/pt/search/${text}`);
      console.log("Célula a ser editada:", configCell);
      setPictograms(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPictogramsByText();
  }, [text]);

  return (
    <ConfigMenuContainer>
      <ConfigHeader/>
      {
        configCell &&
        <ConfigCellContainer>
          <SettingsContainer>
            <ConfigCellForm>
              <Input text={text} handleTextChange={handleTextChange} label="Texto" />
              <ColorPicker color={color} handleColorChange={handleColorChange} label="Cor da borda"/>
            </ConfigCellForm>
            <ConfigCellPictograms>
              {pictograms.map((pictogram, index) => {
                return (
                  <PictogramItem 
                      key={index}
                      $currentPictogram={configCell.img === `${pictogramUrlPrefix}${pictogram._id}/${pictogram._id}_300.png`}
                      onClick={() => handlePictogramClick(pictogram._id)}
                    >
                    <Symbol source={`${pictogramUrlPrefix}${pictogram._id}/${pictogram._id}_300.png`} />
                  </PictogramItem>
                );
              })}
            </ConfigCellPictograms>
          </SettingsContainer>
          <ConfirmButton 
            updateCell={updateCellAndBoard}
            text="Confirmar" 
            height="40px" 
            width="180px" 
            margin="100px 0 0 0" 
          />
        </ConfigCellContainer>
      }
    </ConfigMenuContainer>
  );
}

export default ConfigMenu;