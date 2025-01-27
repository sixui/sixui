import type { IHslColor } from '../types';

export const getHslColor = (hsl: IHslColor): string =>
  `hsl(${hsl.hue % 360}, ${hsl.saturation}%, ${hsl.lightness}%)`;
