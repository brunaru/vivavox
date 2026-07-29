import { useState } from "react";
import api from "../services/api";

export function useS3Upload() {
  const [error, setError] = useState(null);

  async function uploadFile(asset) {
    setError(null);
    try {
      const fileName = asset.fileName || `upload_${Date.now()}.jpg`;
      const fileType = asset.type || "image/jpeg";

      const { data } = await api.get("/cell/uploadUrl", {
        params: { fileName, fileType },
      });

      const fileResponse = await fetch(asset.uri);
      const rawBlob = await fileResponse.blob();

      // Força o type do Blob a bater exatamente com o que foi assinado
      const blob = rawBlob.slice(0, rawBlob.size, fileType);

      const putResponse = await fetch(data.uploadUrl, {
        method: "PUT",
        body: blob,
        headers: { "Content-Type": fileType },
      });

      if (!putResponse.ok) {
        const errorText = await putResponse.text();
        console.error("S3 PUT falhou:", putResponse.status, errorText);
        throw new Error(`Upload falhou: ${putResponse.status}`);
      }

      return data.uploadUrl.split("?")[0];
    } catch (err) {
      console.error("Erro no upload:", err);
      setError(err);
      throw err;
    }
  }

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