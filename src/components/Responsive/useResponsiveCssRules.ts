import { useThemeContext } from '~/components/ThemeProvider/ThemeProvider.context';
import { getSizesCssStyles } from './getSizesCssStyles';
import { getVisibilityCssStyles } from './getVisibilityCssStyles';
import { getWindowSizeClassRanges } from './getWindowSizeClassRanges';

export const useResponsiveCssRules = (): string => {
  const { theme } = useThemeContext();

  const ranges = getWindowSizeClassRanges(theme.windowSizeClasses);
  const rules = [
    getVisibilityCssStyles(ranges),
    getSizesCssStyles(ranges),
  ].join('\n');

  return rules;
};
