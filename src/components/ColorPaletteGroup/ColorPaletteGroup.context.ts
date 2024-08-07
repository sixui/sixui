import { createContext } from 'react';

export type IColorPaletteGroupContextValue = {
  customColors?: Array<string>;
  quantizedPalette?: Array<string>;
  setQuantizedPalette: (palette: Array<string>) => void;
};

export const ColorPaletteGroupContext = createContext<
  IColorPaletteGroupContextValue | undefined
>(undefined);
