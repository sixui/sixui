import type { IThemeSettings } from '@/themes/theme.types';
import type { StyleXStyles } from '@stylexjs/stylex';
import { useThemeContext } from '@/components/utils/Theme';

export type IUseComponentThemeResult = {
  settings: IThemeSettings;
  overridenStyles?: StyleXStyles;
};

export const useComponentTheme = (
  componentName: string,
): IUseComponentThemeResult => {
  const themeContext = useThemeContext();

  return {
    settings: themeContext.settings,
    overridenStyles: themeContext.componentsStyles?.[componentName],
  };
};
