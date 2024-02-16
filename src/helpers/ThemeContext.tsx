import * as React from 'react';

import type { ITheme } from '@/themes/theme.types';

export type IThemeComponents = ITheme['components'];

export type { ITheme } from '@/themes/theme.types';

export type IThemeContext = {
  theme?: ITheme;
};

export const ThemeContext = React.createContext<IThemeContext>({
  theme: undefined,
});
