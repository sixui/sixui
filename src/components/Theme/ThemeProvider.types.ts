import type { IBaseProps } from '../Base';
import type { IThemeComponentStyles, IThemeSettings } from './ThemeContext';
import type { ITheme } from '~/themes/base';

export type IThemeProviderProps = IBaseProps & {
  children?: React.ReactNode;
  theme?: ITheme;
  settings?: IThemeSettings;
  componentsStyles?: IThemeComponentStyles;
};
