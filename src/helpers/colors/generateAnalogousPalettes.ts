import { createSequence } from '@olivierpascal/helpers';

import { generateAnalogousColorPalette } from './generateAnalogousPalette';

export const generateAnalogousColorPalettes = (
  saturation: number,
  hueCount: number,
  lightnesses: Array<number>,
): Array<Array<string>> => {
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
