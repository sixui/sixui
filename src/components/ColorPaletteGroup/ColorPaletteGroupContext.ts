import { createContext } from 'react';

export type IColorPaletteGroupContextValue = {
  customColors?: Array<string>;
  setQuantizedPalette: (quantizedPalette: Array<string>) => void;
};

export const ColorPaletteGroupContext = createContext<
  IColorPaletteGroupContextValue | undefined
>(undefined);
