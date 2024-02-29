import { createContext } from 'react';

import type { ITheme } from '@/themes/theme.types';

export type IThemeComponents = ITheme['components'];

export type { ITheme } from '@/themes/theme.types';

export type IThemeContext = {
  theme?: ITheme;
};

export const ThemeContext = createContext<IThemeContext>({
  theme: undefined,
});
