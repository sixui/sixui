import {
  hexFromArgb,
  type TonalPalette,
} from '@material/material-color-utilities';

export type ITone = {
  luminance: number;
  colorHex: string;
};

export const generateTones = (
  palette: TonalPalette,
  luminances: Array<number>,
): Array<ITone> =>
  luminances.map((luminance) => ({
    luminance,
    colorHex: hexFromArgb(palette.tone(luminance)),
  }));
