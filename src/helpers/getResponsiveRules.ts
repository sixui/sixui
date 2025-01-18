import type {
  IThemeWindowSizeClassesValues,
  IThemeWindowSizeClassName,
} from '~/components/ThemeProvider';
import { isProduction } from './isProduction';
import { em } from './styles/em';
import { getNumericPixelValue } from './styles/getNumericPixelValue';

export type IWindowSizeClassContainerName =
  | IThemeWindowSizeClassName
  | `${IThemeWindowSizeClassName}AndUp`;

export type IResponsiveRule = {
  className: string;
  minWidth: number;
  maxWidth?: number;
  query: string;
};

export const getResponsiveRules = (
  classes: IThemeWindowSizeClassesValues,
): string =>
  Object.entries(classes).reduce((acc, [key, breakpoint]) => {
    if (!breakpoint) {
      return acc;
    }

    const isPxBreakpoint = breakpoint.includes('px');
    const pxValue = getNumericPixelValue(breakpoint);
    if (!pxValue) {
      if (!isProduction()) {
        // eslint-disable-next-line no-console
        console.error(
          `sixui: Invalid breakpoint value for window class "${key}": ${breakpoint}`,
        );
      }

      return acc;
    }

    const maxWidthBreakpoint = isPxBreakpoint
      ? `${pxValue - 0.1}px`
      : em(pxValue - 0.1);
    const minWidthBreakpoint = isPxBreakpoint ? `${pxValue}px` : em(pxValue);

    const rule = `@media (max-width: ${maxWidthBreakpoint}) {.sixui-visible-from-${key} {display: none !important;}}@media (min-width: ${minWidthBreakpoint}) {.sixui-hidden-from-${key} {display: none !important;}}`;

    return `${acc}${rule}`;
  }, '');
