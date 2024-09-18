import type { ComplexStyleRule } from '@vanilla-extract/css';
import { style } from '@vanilla-extract/css';

import { isFunction } from '~/helpers/isFunction';

export const createStyles = <TClassName extends string>(
  stylesObject: Partial<
    Record<
      'root' | TClassName,
      | ComplexStyleRule
      | ((styleNames: Record<'root' | TClassName, string>) => ComplexStyleRule)
    >
  > = {},
): Record<'root' | TClassName, string> => {
  if (isFunction(stylesObject.root)) {
    throw new Error(
      '[@sixui] createStyles: root className cannot be a function. Please use an object.',
    );
  }

  const root = style(stylesObject.root ?? {});

  return Object.keys(stylesObject).reduce(
    (acc, key: string) => {
      if (key === 'root') {
        return acc;
      }

      const styles = stylesObject[key as TClassName];
      if (!styles) {
        return acc;
      }

      if (isFunction(styles)) {
        return {
          ...acc,
          [key]: style(styles(acc)),
        };
      }

      return {
        ...acc,
        [key]: style(styles),
      };
    },
    { root } as Record<'root' | TClassName, string>,
  );
};
