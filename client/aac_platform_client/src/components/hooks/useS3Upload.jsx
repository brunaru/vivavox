import { useState } from 'react';
import api from "../../services/api";
import axios from 'axios';
import imageCompression from 'browser-image-compression';

// Função para comprimir imagem antes do upload
async function compressFile(file) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Erro ao comprimir imagem:", error);
    return file;
  }
}

export function useS3Upload() {
  const [error, setError] = useState(null);

  // Faz upload do arquivo e retorna a URL final da imagem no S3
  async function uploadFile(file) {
    setError(null);

    try {
      const compressedFile = await compressFile(file);

      const { data } = await api.get("/cell/uploadUrl", {
        params: {
          fileName: compressedFile.name,
          fileType: compressedFile.type,
        },
      });

      await axios.put(data.uploadUrl, compressedFile, {
        headers: { "Content-Type": compressedFile.type },
      });

      const imageURL = data.uploadUrl.split("?")[0];
      return imageURL;
    } catch (err) {
      console.error("Erro no upload:", err);
      setError(err);
      throw err;
    }
  }

  // Deleta a imagem da S3
  async function deleteFile(url) {
    setError(null);

    try {
      await api.delete("/cell/deleteImage", { data: { imageUrl: url } });
    } catch (err) {
      console.error("Erro ao deletar imagem:", err);
      setError(err);
      throw err;
    }
  }

  return { uploadFile, deleteFile, error };
}
