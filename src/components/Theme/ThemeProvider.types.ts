import type { IContainerProps } from '@/helpers/types';
import type { IThemeComponentStyles, IThemeSettings } from './ThemeContext';
import type { ITheme } from '@/themes/base';

export type IThemeProviderProps = IContainerProps & {
  children?: React.ReactNode;
  theme?: ITheme;
  settings?: IThemeSettings;
  componentsStyles?: IThemeComponentStyles;
};
