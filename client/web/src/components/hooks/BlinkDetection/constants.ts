/**
 * Constantes para detecção de piscadas
 */

export const VIDEO_SIZE = 500;
export const EAR_THRESHOLD = 0.27; // Eye Aspect Ratio threshold para detectar piscada

// Índices de landmarks do MediaPipe FaceMesh para cada olho
export const RIGHT_EYE_UPPER_INDICES = [33, 7, 163, 144, 145, 153, 154, 155, 133];
export const RIGHT_EYE_LOWER_INDICES = [33, 246, 161, 160, 159];
export const LEFT_EYE_UPPER_INDICES = [263, 249, 390, 373, 374, 380, 381, 382, 362];
export const LEFT_EYE_LOWER_INDICES = [263, 466, 388, 387, 386];

// Delay antes de iniciar o loop de predição (em ms)
export const PREDICTION_START_DELAY = 500;

// Intervalo para calcular taxa de piscadas (em ms)
export const BLINK_RATE_INTERVAL = 10000;

// Multiplicador para converter contagem de piscadas em taxa por minuto
export const BLINK_RATE_MULTIPLIER = 6;

// Número de frames de piscada contínua para detectar piscada voluntária
export const VOLUNTARY_BLINK_THRESHOLD = 4;
