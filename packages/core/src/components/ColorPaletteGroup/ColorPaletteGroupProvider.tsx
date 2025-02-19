import { useState } from 'react';

import type { IColorPaletteGroupContextValue } from './ColorPaletteGroup.context';
import type { IColorPaletteGroupProviderProps } from './ColorPaletteGroupProvider.types';
import { ColorPaletteGroupprovider } from './ColorPaletteGroup.context';

export const ColorPaletteGroupProvider: React.FC<
  IColorPaletteGroupProviderProps
> = (props) => {
  const { children, customPalette } = props;
  const [quantizedPalette, setQuantizedPalette] = useState<Array<string>>();

  const contextValue: IColorPaletteGroupContextValue = {
    customPalette,
    quantizedPalette,
    setQuantizedPalette,
  };

  return (
    <ColorPaletteGroupprovider value={contextValue}>
      {children}
    </ColorPaletteGroupprovider>
  );
};
