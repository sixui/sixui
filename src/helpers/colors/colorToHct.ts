import { argbFromHex, Hct } from '@material/material-color-utilities';

import type { IColor } from '@/helpers/types';
import { isValidHexColor } from './isValidHexColor';

export const colorToHct = (color: IColor): Hct =>
  Hct.fromInt(
    typeof color === 'string'
      ? argbFromHex(isValidHexColor(color) ? color : '#000000')
      : color,
  );
