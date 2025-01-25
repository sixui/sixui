import { createContext } from 'react';

import type { IColorPalette } from '~/components/ColorPickerContent';

export type IColorPaletteGroupContextValue = {
  customPalette?: IColorPalette;
  quantizedPalette?: IColorPalette;
  setQuantizedPalette: (palette: IColorPalette) => void;
};

export const ColorPaletteGroupContext = createContext<
  IColorPaletteGroupContextValue | undefined
>(undefined);
