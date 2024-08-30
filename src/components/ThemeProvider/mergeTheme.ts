import type { ITheme2, IThemeOverride } from './theme.types';
import { deepMerge } from '~/helpers/deepMerge';

export const mergeTheme = (
  currentTheme: ITheme2,
  themeOverride?: IThemeOverride,
): ITheme2 => deepMerge(currentTheme, themeOverride);
