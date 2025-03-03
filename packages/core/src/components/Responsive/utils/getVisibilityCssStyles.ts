import type { IWindowSizeClassRanges } from '~/utils/css';
import { getBreakpointPlusEpsilon, stringFromStyles } from '~/utils/css';
import { keys } from '~/utils/keys';

/**
 * Forge the media queries to hide/show elements based on the window class size.
 */
export const getVisibilityCssStyles = (
  ranges: IWindowSizeClassRanges,
): string => {
  const cssList = keys(ranges)
    .map((rangeName) => {
      const range = ranges[rangeName];

      const breakpointWidth = range.maxWidth;
      if (!breakpointWidth) {
        return [];
      }

      const visibleFromCss = stringFromStyles({
        selector: `.sixui-visible-from-${rangeName}`,
        mediaQueries: [
          {
            query: `(max-width: ${breakpointWidth})`,
            styles: { display: 'none !important' },
          },
        ],
      });

      const hiddenFromCss = stringFromStyles({
        selector: `.sixui-hidden-from-${rangeName}`,
        mediaQueries: [
          {
            query: `(min-width: ${getBreakpointPlusEpsilon(breakpointWidth)})`,
            styles: { display: 'none !important' },
          },
        ],
      });

      return [visibleFromCss, hiddenFromCss];
    })
    .flat();

  const styles = cssList.join('\n');

  return styles;
};
