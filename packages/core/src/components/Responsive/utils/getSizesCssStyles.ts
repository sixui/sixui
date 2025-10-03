import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IWindowSizeClassRanges } from '~/utils/css';
import { stringFromStyles } from '~/utils/css';
import { CSS_TRUE } from '~/utils/css/constants';
import { keys } from '~/utils/keys';
import { responsiveTheme } from '../Responsive.css';

/**
 * Forge the media queries to conditionally set CSS properties based on the
 * window class size.
 */
export const getSizesCssStyles = (ranges: IWindowSizeClassRanges): string => {
  const tokens = responsiveTheme.tokens.windowSizeClass;
  const windowSizeClassNames = keys(tokens);

  const cssList = keys(ranges).map((rangeName, rangeIndex) => {
    const range = ranges[rangeName];

    const responsiveVars = assignInlineVars({
      [tokens[rangeName].on]: CSS_TRUE,

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

    const css = stringFromStyles({
      selector: `.${responsiveTheme.classNames.root}`,
      queries: [
        {
          query: `(min-width: ${range.minWidth})${range.maxWidth !== undefined ? ` and (max-width: ${range.maxWidth})` : ''}`,
          styles: responsiveVars,
        },
      ],
    });

    return css;
  });

  const styles = cssList.join('\n');

  return styles;
};
