import { style, type ComplexStyleRule } from '@vanilla-extract/css';

export const createStyles = <TClassName extends string>(
  obj: Record<TClassName, ComplexStyleRule>,
): Record<TClassName, string> =>
  Object.keys(obj).reduce(
    (acc, key: string) => {
      const xx = {
        ...acc,
        [key]: style(obj[key as TClassName]),
      };

      return xx;
    },
    {} as Record<TClassName, string>,
  );
