import { createSequence } from '@olivierpascal/helpers';

import { hctFromHexColor } from './hctFromHexColor';
import { generateTonalColorPalette } from './generateTonalColorPalette';

export const generateTonalColorPalettes = (
  sourceColor: string,
  hueCount: number,
  tones: Array<number>,
): Array<Array<string>> => {
  const hueRotationStep = 360 / hueCount;
  const hueRotations = createSequence(360 / hueRotationStep);
  const sourceColorHct = hctFromHexColor(sourceColor);
  const palettes = hueRotations.map(
    (hueRotationIndex) =>
      generateTonalColorPalette(
        sourceColorHct.hue + hueRotationIndex * hueRotationStep,
        sourceColorHct.chroma,
        tones,
      ),
    [] as Array<string>,
  );

  return palettes;
};
