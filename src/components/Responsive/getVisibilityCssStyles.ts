import type { IWindowSizeClassRange } from './getWindowSizeClassRanges';
import { getBreakpointPlusEpsilon } from './getBreakpointPlusEpsilon';

export const getVisibilityCssStyles = (
  ranges: Array<IWindowSizeClassRange>,
): string => {
  // Forge the media queries to hide/show elements based on the window class
  // size.

  const mediaQueries = ranges
    .map((range) => {
      const breakpointWidth = range.maxBreakpointWidth;
      if (!breakpointWidth) {
        return [];
      }

      const mediaQueries = [
        `@media (max-width: ${breakpointWidth}) {`,
        `  .sixui-visible-from-${range.name} { display: none !important; }`,
        `}`,
        `@media (min-width: ${getBreakpointPlusEpsilon(breakpointWidth)}) {`,
        ` .sixui-hidden-from-${range.name} { display: none !important; }`,
        `}`,
      ];

      return mediaQueries;
    })
    .flat();

  const styles = mediaQueries.join('\n');

  return styles;
};
