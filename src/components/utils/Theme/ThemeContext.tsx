import { createContext } from 'react';

import type { ITheme, IThemeSettings } from '@/themes/theme.types';

export type IThemeComponents = ITheme['components'];

export type { ITheme } from '@/themes/theme.types';

export type IThemeContext = {
  theme: ITheme;
  settings?: IThemeSettings;
};

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
