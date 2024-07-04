import { createContext } from 'react';

import type { ITheme, IThemeSettings } from '@/themes/theme.types';

export type IThemeComponents = ITheme['components'];

export type { ITheme } from '@/themes/theme.types';

export type IThemeContextValue = {
  theme: ITheme;
  settings: IThemeSettings;
};

export const ThemeContext = createContext<IThemeContextValue | undefined>(
  undefined,
);
