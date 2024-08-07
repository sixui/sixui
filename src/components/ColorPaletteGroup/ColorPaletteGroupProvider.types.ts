import { IColorPaletteGroupContextValue } from './ColorPaletteGroup.context';

export type IColorPaletteGroupProviderProps =
  Partial<IColorPaletteGroupContextValue> & {
    children: React.ReactNode;
  };
