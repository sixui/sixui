import { hexFromArgb } from '@material/material-color-utilities';

import type { IColor } from '@/helpers/types';

export const colorToHex = (color: IColor): string =>
  typeof color === 'string' ? color : hexFromArgb(color);
