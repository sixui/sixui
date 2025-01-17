import type { ITheme, IThemeOverride } from './theme.types';
import { deepMerge } from '~/helpers/deepMerge';

export const mergeTheme = (
  currentTheme: ITheme,
  themeOverride?: IThemeOverride,
): ITheme => deepMerge(currentTheme, themeOverride);
