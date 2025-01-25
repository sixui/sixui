import { hexFromArgb, TonalPalette } from '@material/material-color-utilities';

export const generateTonalColorPalette = (
  hue: number,
  chroma: number,
  tones: Array<number>,
): Array<string> =>
  tones.map((tone) =>
    hexFromArgb(TonalPalette.fromHueAndChroma(hue, chroma).tone(tone)),
  );
