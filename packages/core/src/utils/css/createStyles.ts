import type { ComplexStyleRule } from '@vanilla-extract/css';
import { style } from '@vanilla-extract/css';

import { isFunction } from '~/utils/isFunction';
import { cssLayers } from '~/components/Theme/cssLayers.css';

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
      '[@sixui/core] createStyles: root className cannot be a function. Please use an object.',
    );
  }

  const root = style(
    (stylesObject.root
      ? { '@layer': { [cssLayers.components]: stylesObject.root } }
      : {}) as ComplexStyleRule,
  );

  return Object.keys(stylesObject).reduce(
    (acc, key: string) => {
      if (key === 'root') {
        return acc;
      }

      const styles = stylesObject[key as TClassName];
      if (!styles) {
        return acc;
      }

      return {
        ...acc,
        [key]: style({
          '@layer': {
            [cssLayers.components]: isFunction(styles) ? styles(acc) : styles,
          },
        } as ComplexStyleRule),
      };
    },
    { root } as Record<'root' | TClassName, string>,
  );
};
