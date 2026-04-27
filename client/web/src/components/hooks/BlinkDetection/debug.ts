/**
 * Sistema de debug para detecção de piscadas
 * Controla a exibição de logs e informações de diagnóstico
 */

export let DEBUG_MODE = false;

export const setDebugMode = (enabled: boolean) => {
  DEBUG_MODE = enabled;
};

export const debugLog = (message: string, data?: unknown) => {
  if (!DEBUG_MODE) return;
  
  if (data !== undefined) {
    console.log(`[BlinkDetection] ${message}`, data);
  } else {
    console.log(`[BlinkDetection] ${message}`);
  }
};

export const debugError = (message: string, error?: unknown) => {
  if (!DEBUG_MODE) return;
  
  if (error) {
    console.error(`[BlinkDetection Error] ${message}`, error);
  } else {
    console.error(`[BlinkDetection Error] ${message}`);
  }
};

export const debugWarn = (message: string, data?: unknown) => {
  if (!DEBUG_MODE) return;
  
  if (data !== undefined) {
    console.warn(`[BlinkDetection] ${message}`, data);
  } else {
    console.warn(`[BlinkDetection] ${message}`);
  }
};
