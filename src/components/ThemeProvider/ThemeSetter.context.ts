import type { PartialDeep } from 'type-fest';
import { createContext } from 'react';

import { ITheme2 } from './theme.types';

export type IThemeSetterContextValue = {
  setTheme: (theme: PartialDeep<ITheme2> | undefined) => void;
};

export const ThemeSetterContext = createContext<
  IThemeSetterContextValue | undefined
>(undefined);
