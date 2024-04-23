import { useContext } from 'react';

import {
  ColorSchemeContext,
  type IColorSchemeContext,
} from './ColorSchemeContext';

export const useColorScheme = (): IColorSchemeContext => {
  const context = useContext(ColorSchemeContext);

  return context;
};
