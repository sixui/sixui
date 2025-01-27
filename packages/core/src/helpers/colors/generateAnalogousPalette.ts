import { hexFromHslColor } from './hexFromHslColor';

export const generateAnalogousColorPalette = (
  hue: number,
  saturation: number,
  lightnesses: Array<number>,
): Array<string> =>
  lightnesses.map((lightness) =>
    hexFromHslColor({ hue, saturation, lightness }),
  );
