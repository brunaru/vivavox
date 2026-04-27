/**
 * Hook useBlinkDetection - Detecção de piscadas usando MediaPipe FaceMesh
 * 
 * Refatorado em módulos SOLID-compliant seguindo princípios de Clean Code.
 * Mantém 100% de compatibilidade com a interface original.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import { setUpCamera, stopMediaStream } from './cameraManager';
import { loadModelGlobal } from './modelLoader';
import { detectBlink, extractKeypoints } from './eyeDetection';
import { debugLog, debugError, setDebugMode } from './debug';
import { PREDICTION_START_DELAY, BLINK_RATE_INTERVAL, VIDEO_SIZE } from './constants';
import type { BlinkEvent, UseBlinkDetectionReturn, DetectorType } from './types';

// Export debug utilities for external access
export { setDebugMode };
export { DEBUG_MODE } from './debug';

export const useBlinkDetection = (
  videoRef: React.RefObject<HTMLVideoElement>
): UseBlinkDetectionReturn => {
  const modelRef = useRef<DetectorType | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Refs para gerenciar o estado
  const isActiveRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const rateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Estados
  const [blinkRate, setBlinkRate] = useState(0);
  const totalBlinkCountRef = useRef(0);
  const previousBlinkStateRef = useRef(false);
  const consecutiveFramesClosedRef = useRef(0);

  // Referências para rastrear blinks
  const tempBlinkCountRef = useRef(0);

  // Callback para inicializar calculadora de taxa de piscadas
  const initBlinkRateCalculator = useCallback(() => {
    if (rateIntervalRef.current) {
      clearInterval(rateIntervalRef.current);
    }
    tempBlinkCountRef.current = 0;
    rateIntervalRef.current = setInterval(() => {
      setBlinkRate(tempBlinkCountRef.current * 6);
      tempBlinkCountRef.current = 0;
    }, BLINK_RATE_INTERVAL);
  }, []);

  const loadModel = useCallback(async () => {
    try {
      setIsLoading(true);
      debugLog('⏳ Iniciando carregamento do modelo...');
      await tf.setBackend('webgl');
      const detector = await loadModelGlobal();
      modelRef.current = detector;
      debugLog('✅ Modelo carregado com sucesso!');
      await new Promise((resolve) => setTimeout(resolve, 100));
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load model';
      debugError('Erro ao carregar modelo', err);
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  const setUpCameraWrapper = useCallback(async () => {
    try {
      if (!videoRef.current) return;

      debugLog('🎥 Solicitando permissão de câmera...');

      if (!canvasRef.current) {
        canvasRef.current = document.createElement('canvas');
        canvasRef.current.width = VIDEO_SIZE;
        canvasRef.current.height = VIDEO_SIZE;
        debugLog('🖼️ Canvas criado');
      }

      streamRef.current = await setUpCamera(videoRef.current);

      const video = videoRef.current;
      debugLog('✅ Câmera configurada');

      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise.catch((error: unknown) => {
          if (error instanceof Error) {
            debugLog('⚠️ Autoplay bloqueado:', error.message);
          }
        });
      }

      // Se os metadados já estiverem disponíveis, resolvemos imediatamente.
      if (video.readyState >= 1 || video.videoWidth > 0 || video.videoHeight > 0) {
        debugLog(`📹 Vídeo pronto (metadata já disponível): ${video.videoWidth}x${video.videoHeight}`);
        return video;
      }

      return new Promise<HTMLVideoElement>((resolve) => {
        const onLoadedMetadata = () => {
          video.removeEventListener('loadedmetadata', onLoadedMetadata);
          debugLog(`📹 Vídeo carregado: ${video.videoWidth}x${video.videoHeight}`);
          resolve(video);
        };
        video.addEventListener('loadedmetadata', onLoadedMetadata);
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to set up camera';
      debugError('Erro ao acessar câmera', err);
      setError(errorMessage);
      throw err;
    }
  }, [videoRef]);

  const renderPrediction = useCallback(async (): Promise<BlinkEvent> => {
    if (!isActiveRef.current) {
      return {
        left: false,
        right: false,
        wink: false,
        blink: false,
        longBlink: false,
        rate: blinkRate,
        blinkCount: totalBlinkCountRef.current,
      };
    }

    if (!modelRef.current || !videoRef.current || !canvasRef.current) {
      return {
        left: false,
        right: false,
        wink: false,
        blink: false,
        longBlink: false,
        rate: blinkRate,
        blinkCount: totalBlinkCountRef.current,
      };
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      return {
        left: false,
        right: false,
        wink: false,
        blink: false,
        longBlink: false,
        rate: blinkRate,
        blinkCount: totalBlinkCountRef.current,
      };
    }

    try {
      if (video.readyState < 2) {
        return {
          left: false,
          right: false,
          wink: false,
          blink: false,
          longBlink: false,
          rate: blinkRate,
          blinkCount: totalBlinkCountRef.current,
        };
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return {
          left: false,
          right: false,
          wink: false,
          blink: false,
          longBlink: false,
          rate: blinkRate,
          blinkCount: totalBlinkCountRef.current,
        };
      }

      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      ctx.restore();

      const predictions = await (modelRef.current as DetectorType).estimateFaces(canvas);

      if (predictions && predictions.length > 0) {
        const keypoints = extractKeypoints(predictions);

        if (keypoints.length > 0) {
          const eyeState = detectBlink(keypoints);

          if (eyeState.bothClosed) {
            consecutiveFramesClosedRef.current++;
            tempBlinkCountRef.current++;
          } else {
            const wasJustClosed = consecutiveFramesClosedRef.current > 0;
            const voluntaryBlink = wasJustClosed && consecutiveFramesClosedRef.current >= 4;
            consecutiveFramesClosedRef.current = 0;

            if (voluntaryBlink) {
              debugLog('✨ Piscada voluntária detectada');
              if (!previousBlinkStateRef.current) {
                totalBlinkCountRef.current++;
                debugLog(`🔴 PISCADA DETECTADA! Total: ${totalBlinkCountRef.current}`);
              }
            }
          }

          previousBlinkStateRef.current = eyeState.bothClosed;

          return {
            left: eyeState.leftClosed,
            right: eyeState.rightClosed,
            wink: eyeState.leftClosed || eyeState.rightClosed,
            blink: eyeState.bothClosed,
            longBlink: consecutiveFramesClosedRef.current > 8,
            rate: blinkRate,
            blinkCount: totalBlinkCountRef.current,
          };
        }
      }

      return {
        left: false,
        right: false,
        wink: false,
        blink: false,
        longBlink: false,
        rate: blinkRate,
        blinkCount: totalBlinkCountRef.current,
      };
    } catch (err) {
      debugError('Erro em renderPrediction', err);
      return {
        left: false,
        right: false,
        wink: false,
        blink: false,
        longBlink: false,
        rate: blinkRate,
        blinkCount: totalBlinkCountRef.current,
      };
    }
  }, [blinkRate, videoRef]);

  const startPrediction = useCallback(
    (onPrediction: (result: BlinkEvent) => void) => {
      if (isActiveRef.current) {
        debugLog('⚠️ Predição já está ativa');
        return () => {};
      }

      isActiveRef.current = true;
      debugLog('📢 Iniciando predição');

      initBlinkRateCalculator();

      const predict = async () => {
        if (!isActiveRef.current) {
          return;
        }

        try {
          const result = await renderPrediction();
          if (result) {
            onPrediction(result);
          }
        } catch (err) {
          debugError('Erro na predição', err);
        }

        if (isActiveRef.current) {
          rafRef.current = requestAnimationFrame(predict);
        }
      };

      // Aguardar estabilização do vídeo
      const timeoutId = setTimeout(() => {
        if (isActiveRef.current) {
          debugLog('🚀 Loop iniciado');
          predict();
        }
      }, PREDICTION_START_DELAY);

      return () => {
        clearTimeout(timeoutId);
      };
    },
    [renderPrediction, initBlinkRateCalculator]
  );

  const stopPrediction = useCallback(() => {
    debugLog('🛑 Parando predição');

    isActiveRef.current = false;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (rateIntervalRef.current !== null) {
      clearInterval(rateIntervalRef.current);
      rateIntervalRef.current = null;
    }

    stopMediaStream(streamRef);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    debugLog('✅ Predição parada');
  }, [videoRef]);

  const initialize = useCallback(async () => {
    try {
      debugLog('🔧 Inicializando');
      await loadModel();
      await setUpCameraWrapper();
      debugLog('✅ Inicialização completa');
    } catch (err) {
      debugError('Erro na inicialização', err);
    }
  }, [loadModel, setUpCameraWrapper]);

  const useBlinkAsTrigger = useCallback(
    (onBlinkTrigger: () => void) => {
      let lastBlinkState = false;
      const cleanup = startPrediction((blinkEvent) => {
        if (!blinkEvent.blink && lastBlinkState) {
          debugLog('🎯 Piscada completa detectada como trigger');
          onBlinkTrigger();
        }
        lastBlinkState = blinkEvent.blink;
      });
      return cleanup;
    },
    [startPrediction]
  );

  useEffect(() => {
    return () => {
      stopPrediction();
    };
  }, [stopPrediction]);

  return {
    isLoading,
    error,
    initialize,
    startPrediction,
    stopPrediction,
    useBlinkAsTrigger,
  };
};
