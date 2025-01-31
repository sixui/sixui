import { createSequence } from '@olivierpascal/helpers';

import type { IColorPalette } from '../types';
import { generateAnalogousColorPalette } from './generateAnalogousColorPalette';

export const generateAnalogousColorPalettes = (
  saturation: number,
  hueCount: number,
  lightnesses: Array<number>,
): Array<IColorPalette> => {
  const hueRotationStep = 360 / hueCount;
  const hueRotations = createSequence(360 / hueRotationStep);
  const palettes = hueRotations.map((hueRotationIndex) =>
    generateAnalogousColorPalette(
      hueRotationIndex * hueRotationStep,
      saturation,
      lightnesses,
    ),
  );

  return palettes;
};
