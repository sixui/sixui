import { argbFromHex, Hct } from '@material/material-color-utilities';

import type { IColor } from '@/helpers/types';

export const colorToHct = (color: IColor): Hct =>
  Hct.fromInt(typeof color === 'string' ? argbFromHex(color) : color);
