import { TonalPalette } from '@material/material-color-utilities';

import type { IColor } from '@/helpers/types';
import { colorToHct } from './colorToHct';

export const getTextContrastColor = (backgroundColor: IColor): IColor => {
  const backgroundColorHct = colorToHct(backgroundColor);
  const colorPalette = TonalPalette.fromHueAndChroma(
    backgroundColorHct.hue,
    backgroundColorHct.chroma,
  );
  const contrastLuminance = backgroundColorHct.tone >= 60 ? 5 : 95;

  return colorPalette.tone(contrastLuminance);
};
