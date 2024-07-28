import { createSequence } from '@olivierpascal/helpers';

import { hctFromHexColor } from './hctFromHexColor';
import { generateTonalColorPalette } from './generateTonalColorPalette';

export const generateTonalColorPalettes = (
  sourceColor: string,
  hueCount: number,
  tones: Array<number>,
  hideNeutral?: boolean,
): Array<Array<string>> => {
  const hueRotationStep = 360 / hueCount;
  const hueRotations = createSequence(360 / hueRotationStep);
  const sourceColorHct = hctFromHexColor(sourceColor);
  const palettes = hueRotations.map(
    (hueRotationIndex) =>
      generateTonalColorPalette(
        sourceColorHct.hue + hueRotationIndex * hueRotationStep,
        sourceColorHct.chroma < 10 ? 100 : sourceColorHct.chroma,
        tones,
      ),
    [] as Array<string>,
  );

  if (!hideNeutral) {
    const tonesCount = tones.length;
    const neutralTones = createSequence(
      tonesCount,
      0,
      100 / Math.max(tonesCount - 1, 1),
    ).reverse();
    palettes.push(
      generateTonalColorPalette(sourceColorHct.hue, 8, neutralTones),
    );
  }

  return palettes;
};
