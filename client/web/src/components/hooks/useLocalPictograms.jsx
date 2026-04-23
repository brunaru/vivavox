import { useState, useRef } from 'react';

export function useLocalPictograms({ setImage, onFileSelect }) {
  const [localPictograms, setLocalPictograms] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Selecionar arquivo do input
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  }

  // Adicionar imagem selecionada à lista local
  function handleAddLocalPictogram() {
    if (!selectedFile) return;
    const tempUrl = URL.createObjectURL(selectedFile);
    const newPic = { url: tempUrl, file: selectedFile };

    setLocalPictograms(prev => [newPic, ...prev]);
    setSelectedFile(null);

    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  // Upload e seleção de pictograma local
  async function handleUploadLocalPictogram(item) {
    if (!item?.file) return;
    setImage(item.url);
    onFileSelect(item.file);
  }

  return {
    localPictograms,
    handleFileSelect,
    handleAddLocalPictogram,
    handleUploadLocalPictogram,
    fileInputRef,
  };
}
