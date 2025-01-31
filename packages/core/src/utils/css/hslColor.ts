import type { IHslColor } from '~/utils/types';

export const hslColor = (hsl: IHslColor): string =>
  `hsl(${hsl.hue % 360}, ${hsl.saturation}%, ${hsl.lightness}%)`;
