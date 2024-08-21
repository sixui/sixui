import type { ITheme } from '~/themes/base';
import type { IBaseProps } from '../Base';
import type { IThemeComponentStyles, IThemeSettings } from './Theme.context';

export type IThemeProviderProps = IBaseProps & {
  children?: React.ReactNode;
  theme?: Partial<ITheme>;
  settings?: IThemeSettings;
  componentsStyles?: IThemeComponentStyles;
};
