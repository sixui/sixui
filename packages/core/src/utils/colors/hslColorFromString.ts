import type { IHslColor } from '~/utils/types';

export const hslColorFromString = (
  string: string,
  saturation = 75,
  lightness = 75,
): IHslColor => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = (string.charCodeAt(i) + 10) ** 2 + ((hash << 5) - hash);
    // eslint-disable-next-line no-bitwise
    hash = hash & hash;
  }

  return {
    hue: hash % 360,
    saturation,
    lightness,
  };
};
