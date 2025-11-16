/**
 * Motor de predição com RAF loop
 * Orquestra o processamento de frames e chamadas de callback
 */

import { PREDICTION_START_DELAY } from './constants';
import { debugLog, debugError } from './debug';
import type { DetectorType, BlinkEvent } from './types';

export const createPredictionEngine = () => {
  let isRunning = false;
  let rafId: number | null = null;

  return {
    /**
     * Inicia o loop de predição
     */
    start(
      model: DetectorType,
      videoRef: React.MutableRefObject<HTMLVideoElement | null>,
      onPrediction: (result: BlinkEvent) => void
    ) {
      if (isRunning) {
        debugLog('⚠️ Engine já está em execução');
        return;
      }

      isRunning = true;
      debugLog('🚀 Motor de predição iniciado');

      // Aguarda um pouco para o vídeo estabilizar
      setTimeout(() => {
        const predict = async () => {
          if (!isRunning) return;

          try {
            if (!videoRef.current || videoRef.current.readyState !== 4) {
              rafId = requestAnimationFrame(predict);
              return;
            }

            // Estimação de faces
            await model.estimateFaces(videoRef.current);

            // Chamar callback com resultado
            onPrediction({
              // O callback preenchará os valores reais
              left: false,
              right: false,
              wink: false,
              blink: false,
              longBlink: false,
              rate: 0,
              blinkCount: 0,
            } as BlinkEvent);

            if (isRunning) {
              rafId = requestAnimationFrame(predict);
            }
          } catch (error) {
            debugError('Erro na predição', error);
            if (isRunning) {
              rafId = requestAnimationFrame(predict);
            }
          }
        };

        rafId = requestAnimationFrame(predict);
      }, PREDICTION_START_DELAY);
    },

    /**
     * Para o loop de predição
     */
    stop() {
      isRunning = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      debugLog('⏹️ Motor de predição parado');
    },

    /**
     * Verifica se está rodando
     */
    isRunning(): boolean {
      return isRunning;
    },

    /**
     * Reseta o estado
     */
    reset() {
      this.stop();
      debugLog('🔄 Motor de predição resetado');
    },
  };
};
