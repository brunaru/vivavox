import { useState, useRef } from 'react';
import ConfigHeader from '../ConfigHeader';
import StandardCellMenu from '../StandardCellMenu';
import Symbol from '../Symbol';
import {
  SelectorContainer,
  ConfigCellPictograms,
  PictogramItem,
  ButtonPictogramSearch,
  InputPictogramSearch,
  PictogramSearch,
  PictogramContainer
} from './styled';
import { useLocalPictograms } from '../../hooks/useLocalPictograms';

function ConfigCellSelector( props ) {
  const [activeMenu, setActiveMenu] = useState(false);
  const {
    localPictograms,
    handleFileSelect,
    handleAddLocalPictogram,
    handleUploadLocalPictogram,
    fileInputRef,
  } = useLocalPictograms({ setImage: props.setImage, onFileSelect: props.onFileSelect });

  const pictogramUrlPrefix = 'https://static.arasaac.org/pictograms/';

  function handlePictogramClick(pictogram_id) {
    const url = `${pictogramUrlPrefix}${pictogram_id}/${pictogram_id}_300.png`;
    props.setImage(url);
  }

  return (
    <SelectorContainer>
      <ConfigHeader
        text1="Trocar célula"
        text2="Mudar pictograma"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      {activeMenu ? (
        <PictogramContainer>
          <ConfigCellPictograms>
            {localPictograms.map((item, index) => (
              <PictogramItem
                key={`local-${index}`}
                $currentPictogram={props.image === item.url}
                onClick={() => handleUploadLocalPictogram(item)}
              >
                <Symbol source={item.url} />
              </PictogramItem>
            ))}
            {props.pictograms.map((pictogram, index) => (
              <PictogramItem
                key={index}
                $currentPictogram={props.image === `${pictogramUrlPrefix}${pictogram._id}/${pictogram._id}_300.png`}
                onClick={() => handlePictogramClick(pictogram._id)}
              >
                <Symbol source={`${pictogramUrlPrefix}${pictogram._id}/${pictogram._id}_300.png`} />
              </PictogramItem>
            ))}
          </ConfigCellPictograms>

          <PictogramSearch>
            <InputPictogramSearch
              type="file"
              id="pictogramUpload"
              accept="image/*"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
            <ButtonPictogramSearch onClick={handleAddLocalPictogram}>
              Adicionar
            </ButtonPictogramSearch>
          </PictogramSearch>
        </PictogramContainer>
      ) : (
        <StandardCellMenu />
      )}
    </SelectorContainer>
  );
}

export default ConfigCellSelector;  