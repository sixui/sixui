import { hexFromArgb, TonalPalette } from '@material/material-color-utilities';

import { hctFromHexColor } from './hctFromHexColor';

export const getTextContrastColor = (backgroundColor: string): string => {
  const backgroundColorHct = hctFromHexColor(backgroundColor);
  const colorPalette = TonalPalette.fromHueAndChroma(
    backgroundColorHct.hue,
    backgroundColorHct.chroma,
  );
  const contrastLuminance = backgroundColorHct.tone >= 60 ? 5 : 95;

  return hexFromArgb(colorPalette.tone(contrastLuminance));
};
