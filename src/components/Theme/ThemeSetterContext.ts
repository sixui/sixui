import { createContext } from 'react';

import type { ITheme } from '~/themes/base';

export type IThemeSetterContextValue = {
  setTheme: (theme: ITheme | undefined) => void;
};

export const ThemeSetterContext = createContext<
  IThemeSetterContextValue | undefined
>(undefined);
