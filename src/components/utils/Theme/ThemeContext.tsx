import { createContext } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex/lib/StyleXTypes';

import type { ITheme, IThemeSettings } from '@/themes/theme.types';

export type IThemeComponents = ITheme['components'];

export type { ITheme } from '@/themes/theme.types';

export type IThemeContextValue = {
  theme: ITheme;
  settings: IThemeSettings;
  componentsStyles?: Record<string, StyleXStyles>;
};

export const ThemeContext = createContext<IThemeContextValue | undefined>(
  undefined,
);
