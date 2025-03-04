import { useThemeContext } from '~/components/Theme/Theme.context';
import { getWindowSizeClassRanges } from '~/utils/css/getWindowSizeClassRanges';
import { getSizesCssStyles } from '../utils/getSizesCssStyles';
import { getVisibilityCssStyles } from '../utils/getVisibilityCssStyles';

export const useResponsiveCssRules = (): string => {
  const { theme } = useThemeContext();

  const ranges = getWindowSizeClassRanges(theme.windowSizeClasses);
  const rules = [
    getVisibilityCssStyles(ranges),
    getSizesCssStyles(ranges),
  ].join('\n');

  return rules;
};
