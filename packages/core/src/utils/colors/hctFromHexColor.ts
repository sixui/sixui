import { argbFromHex, Hct } from '@material/material-color-utilities';

import { isValidHexColor } from './isValidHexColor';

export const hctFromHexColor = (color: string): Hct =>
  Hct.fromInt(argbFromHex(isValidHexColor(color) ? color : '#000000'));
