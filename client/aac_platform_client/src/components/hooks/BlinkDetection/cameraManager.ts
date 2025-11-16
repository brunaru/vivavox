/**
 * Gerenciador de câmera e stream de vídeo
 * Responsável por inicializar getUserMedia, configurar canvas e gerenciar lifecycle
 */

import { VIDEO_SIZE } from './constants';
import { debugLog, debugError } from './debug';

export const setUpCamera = async (
  videoRef: React.RefObject<HTMLVideoElement> | HTMLVideoElement
): Promise<MediaStream> => {
  debugLog('🎥 Configurando câmera...');

  try {
    const video = videoRef instanceof HTMLVideoElement ? videoRef : videoRef.current;
    if (!video) {
      throw new Error('Referência de vídeo não disponível');
    }

    // Obter stream da câmera
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: VIDEO_SIZE, height: VIDEO_SIZE, facingMode: 'user' },
      audio: false,
    });

    // Atribuir stream ao elemento de vídeo
    video.srcObject = stream;

    // Aguardar metadados carregarem - mas com verificação de readyState
    return new Promise((resolve, reject) => {
      const handleMetadataLoaded = () => {
        debugLog('✅ Metadados do vídeo carregados');
        video.removeEventListener('loadedmetadata', handleMetadataLoaded);
        resolve(stream);
      };

      // Se já está pronto (readyState >= 1), chamar imediatamente
      if (video.readyState >= 1) {
        handleMetadataLoaded();
      } else {
        // Caso contrário, aguardar evento
        video.addEventListener('loadedmetadata', handleMetadataLoaded);
        // Timeout de segurança
        setTimeout(() => {
          video.removeEventListener('loadedmetadata', handleMetadataLoaded);
          reject(new Error('Timeout ao carregar metadados de vídeo'));
        }, 5000);
      }
    });
  } catch (error) {
    debugError('Erro ao configurar câmera', error);
    throw error;
  }
};

export const setupCanvas = (
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
): CanvasRenderingContext2D | null => {
  if (!canvasRef.current || !videoRef.current) {
    debugError('Canvas ou vídeo não disponível');
    return null;
  }

  const canvas = canvasRef.current;

  canvas.width = VIDEO_SIZE;
  canvas.height = VIDEO_SIZE;

  const context = canvas.getContext('2d');
  if (!context) {
    debugError('Não foi possível obter contexto 2D do canvas');
    return null;
  }

  debugLog('🎨 Canvas configurado com dimensões', { width: VIDEO_SIZE, height: VIDEO_SIZE });
  return context;
};

export const stopMediaStream = (streamRef: React.MutableRefObject<MediaStream | null>) => {
  if (streamRef.current) {
    debugLog('🛑 Parando stream de mídia');
    streamRef.current.getTracks().forEach((track) => {
      track.stop();
    });
    streamRef.current = null;
  }
};

export const getFrameFromVideo = (
  context: CanvasRenderingContext2D,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
): ImageData | null => {
  if (!videoRef.current || !context) {
    return null;
  }

  try {
    context.drawImage(videoRef.current, 0, 0, VIDEO_SIZE, VIDEO_SIZE);
    return context.getImageData(0, 0, VIDEO_SIZE, VIDEO_SIZE);
  } catch (error) {
    debugError('Erro ao capturar frame do vídeo', error);
    return null;
  }
};
