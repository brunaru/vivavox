/**
 * Tipos e interfaces para detecção de piscadas
 */

import type * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export interface BlinkEvent {
  left: boolean;
  right: boolean;
  wink: boolean;
  blink: boolean;
  longBlink: boolean;
  rate: number;
  blinkCount: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface EyeLandmarks {
  upper: Point2D[];
  lower: Point2D[];
}

export type DetectorType = Awaited<ReturnType<typeof faceLandmarksDetection.createDetector>>;

export interface BlinkDetectionRefs {
  isActive: React.MutableRefObject<boolean>;
  raf: React.MutableRefObject<number | null>;
  rateInterval: React.MutableRefObject<ReturnType<typeof setInterval> | null>;
  stream: React.MutableRefObject<MediaStream | null>;
  totalBlinkCount: React.MutableRefObject<number>;
  blinkCount: React.MutableRefObject<number>;
  tempBlinkRate: React.MutableRefObject<number>;
  previousBlinkState: React.MutableRefObject<boolean>;
  model: React.MutableRefObject<DetectorType | null>;
  canvas: React.MutableRefObject<HTMLCanvasElement | null>;
}

export interface BlinkDetectionState {
  isLoading: boolean;
  error: string | null;
  blinkRate: number;
}

export interface UseBlinkDetectionReturn {
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  startPrediction: (onPrediction: (result: BlinkEvent) => void) => () => void;
  stopPrediction: () => void;
  useBlinkAsTrigger: (onBlinkTrigger: () => void) => () => void;
}
