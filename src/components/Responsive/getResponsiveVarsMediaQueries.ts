import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IWindowSizeClassRange } from './getWindowSizeClassRanges';
import { CSS_FALSE, CSS_TRUE } from '~/helpers/styles/constants';
import { responsiveTheme } from './Responsive.css';

export const getResponsiveVarsMediaQueries = (
  ranges: Array<IWindowSizeClassRange>,
): Array<string> => {
  // Forge the media queries to conditionally set CSS properties based on
  // the window class size.

  const tokens = responsiveTheme.tokens.windowSizeClass;
  const windowSizeClassNames = ranges.map((range) => range.name);

  const mediaQueries = ranges
    .map((range, rangeIndex) => {
      const responsiveVars = assignInlineVars({
        [tokens[range.name].on]: CSS_TRUE,
        [tokens[range.name].off]: CSS_FALSE,

        ...windowSizeClassNames.reduce(
          (acc, key, index) => ({
            ...acc,
            [index <= rangeIndex ? tokens[key].gte : tokens[key].lt]: CSS_TRUE,
          }),
          {} as Record<string, string | undefined | null>,
        ),
      });

      const serializedResponsiveVars = Object.entries(responsiveVars)
        .map(([key, value]) => `${key}: ${value ?? '""'};`)
        .join(' ');

      const mediaQueries = [
        `@media ${`(min-width: ${range.minBreakpointWidth})`}${range.maxBreakpointWidth !== undefined ? ` and (max-width: ${range.maxBreakpointWidth})` : ''} { .${responsiveTheme.classNames.root} {${serializedResponsiveVars}} }`,
      ];

      return mediaQueries;
    })
    .flat();

  return mediaQueries;
};
