/**
 * Contador de piscadas e cálculo de taxa de piscadas
 * Detecta piscadas voluntárias e calcula a frequência de piscadas
 */

import {
  VOLUNTARY_BLINK_THRESHOLD,
  BLINK_RATE_MULTIPLIER,
} from './constants';
import { debugLog } from './debug';

/**
 * Detecta se a piscada é voluntária (não é um piscar muito rápido)
 */
export const isVoluntaryBlink = (
  consecutiveFramesClosed: number
): boolean => {
  return consecutiveFramesClosed >= VOLUNTARY_BLINK_THRESHOLD;
};

/**
 * Inicializa o contador de taxa de piscadas
 */
export const initBlinkRateCalculator = (): {
  increment: () => void;
  getRate: () => number;
  reset: () => void;
} => {
  let blinkCount = 0;

  return {
    increment() {
      blinkCount++;
      debugLog('📊 Piscada registrada', { totalBlinks: blinkCount });
    },
    getRate() {
      // Taxa de piscadas por minuto: contagem * multiplicador (para normalizar o intervalo)
      return blinkCount * BLINK_RATE_MULTIPLIER;
    },
    reset() {
      debugLog('🔄 Contador de piscadas resetado', { blinkCount });
      blinkCount = 0;
    },
  };
};

/**
 * Gerencia estado de piscada com frame counting
 */
export const createBlinkStateManager = () => {
  let framesClosed = 0;

  return {
    /**
     * Atualiza o estado com nova leitura de fechamento de olho
     * Retorna true se detectou uma transição de aberto->fechado->aberto (piscada completa)
     */
    updateState(currentlyClosed: boolean): boolean {
      if (currentlyClosed) {
        framesClosed++;
      } else {
        // Olho aberto
        const wasJustClosed = framesClosed > 0;
        const completeBlink = wasJustClosed && isVoluntaryBlink(framesClosed);
        framesClosed = 0;
        
        if (completeBlink) {
          debugLog('✨ Piscada completa detectada', { frames: framesClosed });
        }
        
        return completeBlink;
      }

      return false;
    },

    getFramesClosed(): number {
      return framesClosed;
    },

    reset() {
      framesClosed = 0;
      debugLog('🔄 Estado de piscada resetado');
    },
  };
};
