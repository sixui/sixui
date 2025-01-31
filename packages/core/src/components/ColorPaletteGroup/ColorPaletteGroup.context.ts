import { createContext } from 'react';

import { IColorPalette } from '~/utils/types';

export type IColorPaletteGroupContextValue = {
  customPalette?: IColorPalette;
  quantizedPalette?: IColorPalette;
  setQuantizedPalette: (palette: IColorPalette) => void;
};

export const ColorPaletteGroupContext = createContext<
  IColorPaletteGroupContextValue | undefined
>(undefined);
