import { hexFromArgb, TonalPalette } from '@material/material-color-utilities';

import type { IColorPalette } from '../types';

export const generateTonalColorPalette = (
  hue: number,
  chroma: number,
  tones: Array<number>,
): IColorPalette =>
  tones.map((tone) =>
    hexFromArgb(TonalPalette.fromHueAndChroma(hue, chroma).tone(tone)),
  );
