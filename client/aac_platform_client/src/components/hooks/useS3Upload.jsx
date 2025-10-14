import { useState } from 'react';
import api from "../../services/api";
import axios from 'axios';

export function useS3Upload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Faz upload do arquivo e retorna a URL final
  async function uploadFile(file) {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get("/cell/uploadUrl", {
        params: { fileName: file.name, fileType: file.type },
      });

      await axios.put(data.uploadUrl, file, { headers: { "Content-Type": file.type } });

      const imageURL = data.uploadUrl.split("?")[0];
      setLoading(false);
      return imageURL;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }

  // Deleta imagem da S3
  async function deleteFile(url) {
    setLoading(true);
    setError(null);

    try {
      await api.delete("/cell/deleteImage", { data: { imageUrl: url } });
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }

  return { uploadFile, deleteFile, loading, error };
}
