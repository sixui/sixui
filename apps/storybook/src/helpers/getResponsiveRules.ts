import type {
  IThemeWindowSizeClassesValues,
  IThemeWindowSizeClassName,
} from '~/components/ThemeProvider';
import { isProduction } from './isProduction';
import { serializeResponsiveRuleQuery } from './serializeResponsiveRuleQuery';
import { em } from './styles/em';
import { getNumericPixelValue } from './styles/getNumericPixelValue';

export type IWindowSizeClassContainerName =
  | IThemeWindowSizeClassName
  | `${IThemeWindowSizeClassName}AndUp`;

export type IResponsiveRule = {
  containerNames: Array<IWindowSizeClassContainerName>;
  minWidth: string;
  maxWidth: string | undefined;
  query: string;
};

export const getResponsiveRules = (
  classes: IThemeWindowSizeClassesValues,
): Array<IResponsiveRule> =>
  Object.entries(classes).reduce<Array<IResponsiveRule>>(
    (acc, [key, breakpoint], index) => {
      const windowClassName = key as IThemeWindowSizeClassName;
      const previousRule = index > 0 ? acc[index - 1] : undefined;
      const containerNames: Array<IWindowSizeClassContainerName> = previousRule
        ? [
            ...previousRule.containerNames.slice(0, -1),
            `${windowClassName}AndUp`,
            windowClassName,
          ]
        : [`${windowClassName}AndUp`, windowClassName];
      const minWidth = previousRule?.maxWidth ?? '0';
      const maxWidth = breakpoint;
      const query = serializeResponsiveRuleQuery({
        minWidth,
        maxWidth: breakpoint,
      });

      return [...acc, { containerNames, minWidth, maxWidth, query }];

      return acc;
    },
    [],
  );

export const getResponsiveRules2 = (
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
