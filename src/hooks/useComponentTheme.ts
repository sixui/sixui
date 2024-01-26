import type { IThemeComponents } from '@/helpers/ThemeContext';
import { useTheme } from './useTheme';

export const useComponentTheme = <
  IThemeComponent extends keyof IThemeComponents,
>(
  component: IThemeComponent,
): IThemeComponents[IThemeComponent] => {
  const theme = useTheme();

  return theme.components[component];
};
