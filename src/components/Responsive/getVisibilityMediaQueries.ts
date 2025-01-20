import type { IWindowSizeClassRange } from './getWindowSizeClassRanges';
import { getBreakpointPlusEpsilon } from './getBreakpointPlusEpsilon';

export const getVisibilityMediaQueries = (
  ranges: Array<IWindowSizeClassRange>,
): Array<string> => {
  // Forge the media queries to hide/show elements based on the window class
  // size.

  const mediaQueries = ranges
    .map((range) => {
      const breakpointWidth = range.maxBreakpointWidth;
      if (!breakpointWidth) {
        return [];
      }

      const mediaQueries = [
        `@media (max-width: ${breakpointWidth}) { .sixui-visible-from-${range.name} {display: none !important;} }`,
        `@media (min-width: ${getBreakpointPlusEpsilon(breakpointWidth)}) { .sixui-hidden-from-${range.name} {display: none !important;} }`,
      ];

      return mediaQueries;
    })
    .flat();

  return mediaQueries;
};
