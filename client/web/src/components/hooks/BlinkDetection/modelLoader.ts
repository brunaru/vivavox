/**
 * Gerenciador de carregamento do modelo MediaPipe FaceMesh
 * Implementa padrão Singleton com cache de Promise para evitar race conditions
 */

import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { debugLog, debugError } from './debug';
import type { DetectorType } from './types';

let globalModelInstance: DetectorType | null = null;
let modelLoadingPromise: Promise<DetectorType> | null = null;

export const loadModelGlobal = async (): Promise<DetectorType> => {
  // Se o modelo já está carregado, retorna a instância
  if (globalModelInstance) {
    debugLog('📦 Modelo já carregado, retornando instância existente');
    return globalModelInstance;
  }

  // Se um carregamento está em progresso, aguarda a Promise
  if (modelLoadingPromise) {
    debugLog('⏳ Carregamento de modelo já em progresso, aguardando...');
    return modelLoadingPromise;
  }

  // Cria uma nova Promise de carregamento
  modelLoadingPromise = (async () => {
    try {
      debugLog('📥 Iniciando carregamento do modelo FaceMesh...');
      
      globalModelInstance = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: 'tfjs',
          maxFaces: 1,
          refineLandmarks: true,
        } as unknown as Parameters<typeof faceLandmarksDetection.createDetector>[1]
      );

      debugLog('✅ Modelo FaceMesh carregado com sucesso');
      return globalModelInstance as DetectorType;
    } catch (error) {
      debugError('Erro ao carregar modelo FaceMesh', error);
      modelLoadingPromise = null; // Reset para tentar novamente
      throw error;
    }
  })();

  return modelLoadingPromise;
};

export const getModelInstance = (): DetectorType | null => {
  return globalModelInstance;
};

export const resetModel = () => {
  globalModelInstance = null;
  modelLoadingPromise = null;
  debugLog('🔄 Modelo resetado');
};
