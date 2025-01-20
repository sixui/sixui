import { isProduction } from '@olivierpascal/helpers';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import type {
  IThemeWindowSizeClassesValues,
  IThemeWindowSizeClassName,
} from '../ThemeProvider';
import { CSS_FALSE, CSS_TRUE } from '~/helpers/styles/constants';
import { em } from '~/helpers/styles/em';
import { getNumericPixelValue } from '~/helpers/styles/getNumericPixelValue';
import { useThemeContext } from '../ThemeProvider';
import { responsiveTheme } from './Responsive.css';

interface IWindowSizeClassRange {
  name: IThemeWindowSizeClassName;
  minBreakpointWidth?: string;
  maxBreakpointWidth?: string;
}

const getBreakpointPlusEpsilon = (
  breakpoint: string,
  epsilon = 0.1,
): string => {
  const isPxBreakpoint = breakpoint.includes('px');
  const pxValue = getNumericPixelValue(breakpoint);
  if (!pxValue) {
    throw new Error(`sixui: Invalid breakpoint value: ${breakpoint}`);
  }

  const pxValuePlusEpsilon = pxValue + epsilon;
  const breakpointPlusEpsilon = isPxBreakpoint
    ? `${pxValuePlusEpsilon}px`
    : em(pxValuePlusEpsilon);

  return breakpointPlusEpsilon;
};

const getWindowSizeClassRanges = (
  windowSizeClasses: IThemeWindowSizeClassesValues,
): Array<IWindowSizeClassRange> => {
  const windowSizeClassNames = Object.keys(
    windowSizeClasses,
  ) as Array<IThemeWindowSizeClassName>;

  const ranges = windowSizeClassNames.reduce((acc, windowSizeClassName) => {
    const previousRange: IWindowSizeClassRange | undefined =
      acc[acc.length - 1];
    const breakpoint = windowSizeClasses[windowSizeClassName];

    return [
      ...acc,
      {
        name: windowSizeClassName,
        minBreakpointWidth: previousRange?.maxBreakpointWidth
          ? getBreakpointPlusEpsilon(previousRange.maxBreakpointWidth)
          : undefined,
        maxBreakpointWidth: breakpoint,
      },
    ];
  }, [] as Array<IWindowSizeClassRange>);

  return ranges;
};

const getVisibilityMediaQueries = (
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

const getResponsiveVarsMediaQueries = (
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
        `@media (min-width: ${range.minBreakpointWidth}) and (max-width: ${range.maxBreakpointWidth}) { .${responsiveTheme.classNames.root} {${serializedResponsiveVars}} }`,
      ];

      return mediaQueries;
    })
    .flat();

  return mediaQueries;
};

export const useResponsiveCssRules = (): string => {
  const { theme } = useThemeContext();

  const ranges = getWindowSizeClassRanges(theme.windowSizeClasses);
  const rules = [
    ...getVisibilityMediaQueries(ranges),
    ...getResponsiveVarsMediaQueries(ranges),
  ];
  const rulesAsString = rules.join('\n');

  return rulesAsString;
};
