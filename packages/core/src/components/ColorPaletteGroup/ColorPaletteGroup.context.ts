import { createOptionalContext } from '~/utils/react';
import { IColorPalette } from '~/utils/types';

export type IColorPaletteGroupContextValue = {
  customPalette?: IColorPalette;
  quantizedPalette?: IColorPalette;
  setQuantizedPalette: (palette: IColorPalette) => void;
};

export const [ColorPaletteGroupprovider, useColorPaletteGroupContext] =
  createOptionalContext<IColorPaletteGroupContextValue>();
