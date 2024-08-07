import { useState } from 'react';

import type { IColorPaletteGroupProviderProps } from './ColorPaletteGroupProvider.types';
import {
  ColorPaletteGroupContext,
  type IColorPaletteGroupContextValue,
} from './ColorPaletteGroup.context';

export const ColorPaletteGroupProvider: React.FC<
  IColorPaletteGroupProviderProps
> = (props) => {
  const { children, customColors } = props;
  const [quantizedPalette, setQuantizedPalette] = useState<Array<string>>();

  const contextValue: IColorPaletteGroupContextValue = {
    customColors,
    quantizedPalette,
    setQuantizedPalette,
  };

  return (
    <ColorPaletteGroupContext.Provider value={contextValue}>
      {children}
    </ColorPaletteGroupContext.Provider>
  );
};
