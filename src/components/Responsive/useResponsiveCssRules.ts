import { useThemeContext } from '../ThemeProvider/ThemeProvider.context';
import { getResponsiveVarsMediaQueries } from './getResponsiveVarsMediaQueries';
import { getVisibilityMediaQueries } from './getVisibilityMediaQueries';
import { getWindowSizeClassRanges } from './getWindowSizeClassRanges';

export const useResponsiveCssRules = (): string => {
  const { theme } = useThemeContext();

  const ranges = getWindowSizeClassRanges(theme.windowSizeClasses);
  const rules = [
    ...getVisibilityMediaQueries(ranges),
    ...getResponsiveVarsMediaQueries(ranges),
  ].join('\n');

  return rules;
};
