import ConfigHeader from '../ConfigHeader';
import StandardCellMenu from '../StandardCellMenu';
import Symbol from '../Symbol';
import { useState } from 'react';
import {
  SelectorContainer,
  ConfigCellPictograms,
  PictogramItem
} from './styled';


function ConfigCellSelector (props) {
  const [activeMenu, setActiveMenu] = useState(false);
  const pictogramUrlPrefix = 'https://static.arasaac.org/pictograms/';

  function handlePictogramClick(pictogram_id) {
    const selectedImg = `${pictogramUrlPrefix}${pictogram_id}/${pictogram_id}_300.png`;
    props.setImage(selectedImg);
  }

  return (
    <SelectorContainer>
      <ConfigHeader 
        text1="Personalizar célula" 
        text2="Trocar célula"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      {activeMenu ? <StandardCellMenu/> : 
        <ConfigCellPictograms>
          {props.pictograms.map((pictogram, index) => {
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
        </ConfigCellPictograms>
      }
    </SelectorContainer>
  );
}

export default ConfigCellSelector;