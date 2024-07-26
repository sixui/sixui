import { IColorPaletteGroupContextValue } from './ColorPaletteGroupContext';

export type IColorPaletteGroupProviderProps =
  Partial<IColorPaletteGroupContextValue> & {
    children: React.ReactNode;
  };
