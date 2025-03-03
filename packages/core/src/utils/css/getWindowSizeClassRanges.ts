import type {
  IThemeWindowSizeClassesValues,
  IThemeWindowSizeClassName,
} from '~/components/Theme';
import { serializeResponsiveRuleQuery } from './serializeResponsiveRuleQuery';

export interface IWindowSizeClassRange {
  minWidth: string;
  maxWidth?: string;
  query: string;
}

export type IWindowSizeClassRanges = Record<
  IThemeWindowSizeClassName,
  IWindowSizeClassRange
>;

export const getWindowSizeClassRanges = (
  windowSizeClasses: IThemeWindowSizeClassesValues,
): IWindowSizeClassRanges => {
  const windowSizeClassNames = Object.keys(
    windowSizeClasses,
  ) as Array<IThemeWindowSizeClassName>;

  const ranges = windowSizeClassNames.reduce<IWindowSizeClassRanges>(
    (acc, windowSizeClassName, windowSizeClassIndex) => {
      const previousIndex =
        windowSizeClassIndex > 0
          ? windowSizeClassNames[windowSizeClassIndex - 1]
          : undefined;
      const previousRange: IWindowSizeClassRange | undefined = previousIndex
        ? acc[previousIndex]
        : undefined;
      const breakpoint = windowSizeClasses[windowSizeClassName];

      const name = windowSizeClassName;
      const minWidth = previousRange?.maxWidth ?? '0';
      const maxWidth = breakpoint;
      const query = serializeResponsiveRuleQuery({
        minWidth,
        maxWidth,
      });

      return {
        ...acc,
        [windowSizeClassName]: {
          name,
          minWidth,
          maxWidth,
          query,
        },
      };
    },
    {} as IWindowSizeClassRanges,
  );

  return ranges;
};
