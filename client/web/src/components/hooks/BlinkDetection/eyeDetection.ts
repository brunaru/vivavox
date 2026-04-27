/**
 * Lógica de detecção de olhos e cálculo de EAR
 * Extrai landmarks e calcula o Eye Aspect Ratio para detectar piscadas
 */

import {
  EAR_THRESHOLD,
  RIGHT_EYE_UPPER_INDICES,
  RIGHT_EYE_LOWER_INDICES,
  LEFT_EYE_UPPER_INDICES,
  LEFT_EYE_LOWER_INDICES,
} from './constants';
import { debugLog } from './debug';
import type { Point2D, EyeLandmarks } from './types';

/**
 * Calcula a distância euclidiana entre dois pontos
 */
export const getEuclideanDistance = (point1: Point2D, point2: Point2D): number => {
  const diffX = point1.x - point2.x;
  const diffY = point1.y - point2.y;
  return Math.sqrt(diffX * diffX + diffY * diffY);
};

/**
 * Obtém um landmark específico pelo índice
 */
export const getKeypointByIndex = (keypoints: Point2D[], index: number): Point2D | null => {
  if (index < 0 || index >= keypoints.length) {
    return null;
  }
  return keypoints[index];
};

/**
 * Calcula o Eye Aspect Ratio (EAR) comparando landmarks superiores e inferiores
 */
const calculateEAR = (upper: Point2D[], lower: Point2D[]): number => {
  if (upper.length < 9 || lower.length < 5) {
    return 1; // Valor alto significa olho aberto
  }

  // EAR = (distância vertical 1 + distância vertical 2) / (2 * distância horizontal)
  // upper: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  // lower: [0, 1, 2, 3, 4]
  
  // Distância vertical 1: upper[5] para lower[4]
  const verticalDist1 = getEuclideanDistance(upper[5], lower[4]);
  
  // Distância vertical 2: upper[3] para lower[2]
  const verticalDist2 = getEuclideanDistance(upper[3], lower[2]);
  
  // Distância horizontal: upper[0] para upper[8]
  const horizontalDist = getEuclideanDistance(upper[0], upper[8]);

  // Evitar divisão por zero
  if (horizontalDist === 0) {
    return 1;
  }

  // EAR = (vertical1 + vertical2) / (2 * horizontal)
  return (verticalDist1 + verticalDist2) / (2 * horizontalDist);
};

/**
 * Extrai landmarks específicos do olho
 */
export const getEyeLandmarks = (keypoints: Point2D[], indices: number[]): EyeLandmarks => {
  return {
    upper: indices.slice(1, 3).map((idx) => getKeypointByIndex(keypoints, idx) || { x: 0, y: 0 }),
    lower: indices.slice(3, 5).map((idx) => getKeypointByIndex(keypoints, idx) || { x: 0, y: 0 }),
  };
};

/**
 * Detecta piscada analisando ambos os olhos
 */
export const detectBlink = (
  keypoints: Point2D[]
): {
  leftEAR: number;
  rightEAR: number;
  leftClosed: boolean;
  rightClosed: boolean;
  bothClosed: boolean;
} => {
  // Extrair landmarks para olho direito
  const rightEyeUpper = RIGHT_EYE_UPPER_INDICES
    .map(i => getKeypointByIndex(keypoints, i))
    .filter((k): k is Point2D => k !== null);

  const rightEyeLower = RIGHT_EYE_LOWER_INDICES
    .map(i => getKeypointByIndex(keypoints, i))
    .filter((k): k is Point2D => k !== null);

  // Extrair landmarks para olho esquerdo
  const leftEyeUpper = LEFT_EYE_UPPER_INDICES
    .map(i => getKeypointByIndex(keypoints, i))
    .filter((k): k is Point2D => k !== null);

  const leftEyeLower = LEFT_EYE_LOWER_INDICES
    .map(i => getKeypointByIndex(keypoints, i))
    .filter((k): k is Point2D => k !== null);

  // Calcular EAR se todos os landmarks estão disponíveis
  let rightEAR = 1; // Padrão: olho aberto
  let leftEAR = 1;

  if (rightEyeUpper.length === 9 && rightEyeLower.length === 5) {
    rightEAR = calculateEAR(rightEyeUpper, rightEyeLower);
  }

  if (leftEyeUpper.length === 9 && leftEyeLower.length === 5) {
    leftEAR = calculateEAR(leftEyeUpper, leftEyeLower);
  }

  const leftClosed = leftEAR <= EAR_THRESHOLD;
  const rightClosed = rightEAR <= EAR_THRESHOLD;
  const bothClosed = leftClosed && rightClosed;

  debugLog('👁️ EAR Values', { leftEAR: leftEAR.toFixed(3), rightEAR: rightEAR.toFixed(3) });

  return {
    leftEAR,
    rightEAR,
    leftClosed,
    rightClosed,
    bothClosed,
  };
};

/**
 * Extrai keypoints do resultado da detecção
 */
export const extractKeypoints = (
  predictions: unknown
): Point2D[] => {
  if (!predictions || typeof predictions !== 'object') {
    return [];
  }

  const preds = predictions as Record<string, unknown>[] | undefined;
  if (!Array.isArray(preds) || preds.length === 0) {
    return [];
  }

  const firstPred = preds[0];
  
  // Tentar extrair landmarks de keypoints (formato MediaPipe mais comum)
  const landmarks = (firstPred?.keypoints || firstPred?.landmarks) as Record<string, number>[] | undefined;
  if (!landmarks || !Array.isArray(landmarks)) {
    return [];
  }

  // Converter para formato Point2D
  return landmarks.map((kp: Record<string, number>) => ({
    x: typeof kp.x === 'number' ? kp.x : (kp[0] || 0),
    y: typeof kp.y === 'number' ? kp.y : (kp[1] || 0),
  }));
};
