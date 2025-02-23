import { useState } from 'react';
import Input from '../Input';
import {
  StandardCellMenuContainer,
  SearchField,
  StandardCells
} from './styled';

function StandardCellMenu() {
  const [keyText, setKeyText] = useState("");

  function handleKeyTextChange(e) {
    setKeyText(e.target.value);
  }

  // const getCellsByText = useCallback(() => {
  //   if(!keyText.trim()) return;

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(``);
  //       setPictograms(response.data);
  //     } catch(error) {
  //       console.log("Error searching for pictograms");
  //     }
  //   };

  //   // Waits 500ms before fetch:
  //   const delay = setTimeout(fetchData, 500);

  //   // Cancels requisition if 'text' changes before 500ms:
  //   return () => clearTimeout(delay);
  // }, [text]);

  return (
    <StandardCellMenuContainer>
      <SearchField>
        <Input 
          text={keyText} 
          handleTextChange={handleKeyTextChange} 
          type="text"  
          label="Buscar célula:"
        />
      </SearchField>
      {/* <StandardCells>
          {foundCells.map((pictogram, index) => {
            return (
              <PictogramItem
                  key={index}
                  $currentPictogram={props.image === `${pictogramUrlPrefix}${pictogram._id}/${pictogram._id}_300.png`}
                  onClick={() => handlePictogramClick(pictogram._id)}
                >
                <Symbol source={`${pictogramUrlPrefix}${pictogram._id}/${pictogram._id}_300.png`} />
              </PictogramItem>
            );
          })}
        </StandardCells> */}
    </StandardCellMenuContainer>
  );
}

export default StandardCellMenu;