import ConfigHeader from '../ConfigHeader';
import StandardCellMenu from '../StandardCellMenu';
import Symbol from '../Symbol';
import { useState, useRef } from 'react';
import api from "../../../services/api";
import axios from 'axios';
import {
  SelectorContainer,
  ConfigCellPictograms,
  PictogramItem,
  ButtonPictogramSearch,
  InputPictogramSearch,
  PictogramSearch,
  PictogramContainer
} from './styled';

function ConfigCellSelector(props) {
  const [activeMenu, setActiveMenu] = useState(false);
  const [localPictograms, setLocalPictograms] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);
  const pictogramUrlPrefix = 'https://static.arasaac.org/pictograms/';

  function handlePictogramClick(pictogram_id) {
    if (isS3Url(props.image)) {
      handleDelete(props.image);
    }

    const selectedImg = `${pictogramUrlPrefix}${pictogram_id}/${pictogram_id}_300.png`;
    props.setImage(selectedImg);
  }

  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  function handleAddPictogram() {
    if (selectedFile) {
      const newImageUrl = URL.createObjectURL(selectedFile);
      
      const newPictogram = {
        url: newImageUrl,
        file: selectedFile
      };
      
      setLocalPictograms(prevPictograms => [newPictogram, ...prevPictograms]);
      
      setSelectedFile(null);
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function handleDelete(url) {
    try {
      await api.delete("/cell/deleteImage", { data: { imageUrl: url } });
      console.log("Imagem deletada");
    } catch (err) {
      console.error("Erro ao deletar imagem:", err);
    }
  }


  function isS3Url(url) {
    try {
      const parsed = new URL(url);
      return parsed.hostname.includes('.s3.') && parsed.hostname.endsWith('amazonaws.com');
    } catch {
      return false;
    }
  }

  async function handleUpload(file, tempUrl, index) {
    if (!file) return;

    if (isS3Url(props.image)) {
      await handleDelete(props.image);
    }

    props.setImage(tempUrl);

    try {
      const { data } = await api.get("/cell/uploadUrl", {
        params: {
          fileName: file.name,
          fileType: file.type,
        },
      });

      await axios.put(data.uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      const imageURL = data.uploadUrl.split("?")[0];

      setLocalPictograms(prev => {
        const copy = [...prev];
        copy[index] = { ...copy[index], url: imageURL };
        return copy;
      });

      props.setImage(imageURL);

      console.log("Imagem enviada");

    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
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
                onClick={() => handleUpload(item.file, item.url, index)}
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
            <ButtonPictogramSearch onClick={handleAddPictogram}>
              Buscar
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