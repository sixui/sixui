import type { IColor } from '@/helpers/types';
import { colorToHex } from './colorToHex';

export const areColorEquals = (color1: IColor, color2: IColor): boolean =>
  colorToHex(color1) === colorToHex(color2);
