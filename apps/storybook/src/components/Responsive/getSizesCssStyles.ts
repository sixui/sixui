import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IWindowSizeClassRange } from './getWindowSizeClassRanges';
import { CSS_TRUE } from '~/helpers/styles/constants';
import { responsiveTheme } from './Responsive.css';

export const getSizesCssStyles = (
  ranges: Array<IWindowSizeClassRange>,
): string => {
  // Forge the media queries to conditionally set CSS properties based on
  // the window class size.

  const tokens = responsiveTheme.tokens.windowSizeClass;
  const windowSizeClassNames = ranges.map((range) => range.name);

  const mediaQueries = ranges.map((range, rangeIndex) => {
    const responsiveVars = assignInlineVars({
      [tokens[range.name].on]: CSS_TRUE,

      ...windowSizeClassNames.reduce<Record<string, string | undefined | null>>(
        (acc, key, index) =>
          index <= rangeIndex
            ? {
                ...acc,
                [tokens[key].gte]: CSS_TRUE,
              }
            : acc,
        {},
      ),
    });

    const mediaQuery = [
      `@media (min-width: ${range.minBreakpointWidth})${range.maxBreakpointWidth !== undefined ? ` and (max-width: ${range.maxBreakpointWidth})` : ''} {`,
      `  .${responsiveTheme.classNames.root} {`,
      ...Object.entries(responsiveVars).map(
        ([key, value]) => `    ${key}: ${value};`,
      ),
      `  }`,
      `}`,
    ].join('\n');

    return mediaQuery;
  });

  const styles = mediaQueries.join('\n');

  return styles;
};
