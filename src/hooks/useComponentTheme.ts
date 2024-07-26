import type { StyleXStyles } from '@stylexjs/stylex';
import { useThemeContext, type IThemeSettings } from '~/components/Theme';

export type IUseComponentThemeResult = {
  settings?: IThemeSettings;
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
