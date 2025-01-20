import { isProduction } from '@olivierpascal/helpers';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IThemeWindowSizeClassName } from '../ThemeProvider';
import { CSS_FALSE, CSS_TRUE } from '~/helpers/styles/constants';
import { em } from '~/helpers/styles/em';
import { getNumericPixelValue } from '~/helpers/styles/getNumericPixelValue';
import { useThemeContext } from '../ThemeProvider';
import { responsiveTheme } from './Responsive.css';

export const useResponsiveCssRules = (): string => {
  const { theme } = useThemeContext();

  const windowSizeClassNames = Object.keys(
    theme.windowSizeClasses,
  ) as Array<IThemeWindowSizeClassName>;

  const rules = windowSizeClassNames.reduce(
    (acc, windowSizeClassName, windowSizeClassNameIndex) => {
      const breakpoint = theme.windowSizeClasses[windowSizeClassName];
      if (!breakpoint) {
        return acc;
      }

      const isPxBreakpoint = breakpoint.includes('px');
      const pxValue = getNumericPixelValue(breakpoint);
      if (!pxValue) {
        if (!isProduction()) {
          // eslint-disable-next-line no-console
          console.error(
            `sixui: Invalid breakpoint value for window class \`${windowSizeClassName}\`: ${breakpoint}`,
          );
        }

        return acc;
      }

      // Forge the media queries to hide/show elements based on the window class
      // size.

      const minWidthPxValue = pxValue + 0.1;
      const minWidthBreakpoint = isPxBreakpoint
        ? `${minWidthPxValue}px`
        : em(minWidthPxValue);
      const maxWidthBreakpoint = isPxBreakpoint ? `${pxValue}px` : em(pxValue);

      const visibilityMediaQueries = [
        `@media (max-width: ${maxWidthBreakpoint}) { .sixui-visible-from-${windowSizeClassName} {display: none !important;} }`,
        `@media (min-width: ${minWidthBreakpoint}) { .sixui-hidden-from-${windowSizeClassName} {display: none !important;} }`,
      ];

      // Forge the media queries to conditionally set CSS properties based on
      // the window class size.

      const tokens = responsiveTheme.tokens.windowSizeClass;
      const responsiveVars = assignInlineVars({
        [tokens[windowSizeClassName].on]: CSS_TRUE,
        [tokens[windowSizeClassName].off]: CSS_FALSE,

        ...windowSizeClassNames.reduce(
          (acc, key, index) => ({
            ...acc,
            [index <= windowSizeClassNameIndex
              ? tokens[key].gte
              : tokens[key].lt]: CSS_TRUE,
          }),
          {} as Record<string, string | undefined | null>,
        ),
      });
      const serializedResponsiveVars = Object.entries(responsiveVars)
        .map(([key, value]) => `${key}: ${value ?? '""'};`)
        .join(' ');
      const previousWidthBreakpoint =
        acc[acc.length - 1]?.maxWidthBreakpoint ?? '0';

      const responsiveVarsMediaQueries = [
        `@media (min-width: ${previousWidthBreakpoint}) and (max-width: ${maxWidthBreakpoint}) { .${responsiveTheme.classNames.root} {${serializedResponsiveVars}} }`,
      ];

      return [
        ...acc,
        {
          maxWidthBreakpoint,
          rule: [...visibilityMediaQueries, ...responsiveVarsMediaQueries].join(
            '\n',
          ),
        },
      ];
    },
    [] as Array<{ maxWidthBreakpoint: string; rule: string }>,
  );

  const rulesAsString = rules.map(({ rule }) => rule).join('\n');

  return rulesAsString;
};
