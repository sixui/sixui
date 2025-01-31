import type { IColorPalette } from '../types';
import { hexFromHslColor } from './hexFromHslColor';

export const generateAnalogousColorPalette = (
  hue: number,
  saturation: number,
  lightnesses: Array<number>,
): IColorPalette =>
  lightnesses.map((lightness) =>
    hexFromHslColor({ hue, saturation, lightness }),
  );
