import type {
  IThemeWindowSizeClassesValues,
  IThemeWindowSizeClassName,
} from '~/components/Theme';
import { getBreakpointPlusEpsilon } from './getBreakpointPlusEpsilon';

export interface IWindowSizeClassRange {
  name: IThemeWindowSizeClassName;
  minBreakpointWidth: string;
  maxBreakpointWidth?: string;
}

export const getWindowSizeClassRanges = (
  windowSizeClasses: IThemeWindowSizeClassesValues,
): Array<IWindowSizeClassRange> => {
  const windowSizeClassNames = Object.keys(
    windowSizeClasses,
  ) as Array<IThemeWindowSizeClassName>;

  const ranges = windowSizeClassNames.reduce<Array<IWindowSizeClassRange>>(
    (acc, windowSizeClassName) => {
      const previousRange: IWindowSizeClassRange | undefined =
        acc[acc.length - 1];
      const breakpoint = windowSizeClasses[windowSizeClassName];

      return [
        ...acc,
        {
          name: windowSizeClassName,
          minBreakpointWidth: previousRange?.maxBreakpointWidth
            ? getBreakpointPlusEpsilon(previousRange.maxBreakpointWidth)
            : '0',
          maxBreakpointWidth: breakpoint,
        },
      ];
    },
    [],
  );

  return ranges;
};
