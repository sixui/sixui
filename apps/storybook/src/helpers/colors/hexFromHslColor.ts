import type { IHslColor } from '~/helpers/types';

export const hexFromHslColor = (hsl: IHslColor): string => {
  const { hue, saturation, lightness } = hsl;

  const hDecimal = lightness / 100;
  const a = (saturation * Math.min(hDecimal, 1 - hDecimal)) / 100;
  const f = (n: number): string => {
    const k = (n + hue / 30) % 12;
    const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    // Convert to Hex and prefix with "0" if required
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};
