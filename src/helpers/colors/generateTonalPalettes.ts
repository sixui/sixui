import {
  DynamicScheme,
  Hct,
  TonalPalette,
} from '@material/material-color-utilities';
import { createSequence } from '@olivierpascal/helpers';

export const generateTonalPalettes = (
  sourceColorHct: Hct,
  count: number,
): Array<TonalPalette> => {
  const rotationStep = 360 / count;
  const rotations = createSequence(360 / rotationStep);
  const hueBreakpoints = [
    0, // red
    30, // orange
    60, // yellow
    90, // yellow-green
    120, // green
    150, // green-cyan
    180, // cyan
    210, // cyan-blue
    240, // blue
    270, // blue-magenta
    300, // magenta
    330, // magenta-red
  ];

  const palettes = rotations.map((rotationIndex) => {
    const rotation = rotationIndex * rotationStep;
    const rotatedColorArgb = DynamicScheme.getRotatedHue(
      sourceColorHct,
      hueBreakpoints,
      [
        rotation, // red
        rotation, // orange
        rotation, // yellow
        rotation, // yellow-green
        rotation, // green
        rotation, // green-cyan
        rotation, // cyan
        rotation, // cyan-blue
        rotation, // blue
        rotation, // blue-magenta
        rotation, // magenta
        rotation, // magenta-red
      ],
    );

    return TonalPalette.fromHueAndChroma(
      rotatedColorArgb,
      sourceColorHct.chroma,
    );
  }, [] as Array<TonalPalette>);

  return palettes;
};
