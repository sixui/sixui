import { style, type ComplexStyleRule } from '@vanilla-extract/css';
import { isFunction } from '~/helpers/isFunction';

export const createStyles = <TClassName extends string>(
  stylesObject: Record<
    'root' | TClassName,
    ComplexStyleRule | (({ root }: { root: string }) => ComplexStyleRule)
  >,
): Record<TClassName, string> => {
  if (isFunction(stylesObject.root)) {
    throw new Error(
      'createStyles: root className cannot be a function. Please use a string.',
    );
  }

  const root = style(stylesObject.root);

  return Object.keys(stylesObject).reduce(
    (acc, key: string) => {
      if (key === 'root') {
        return acc;
      }

      const styles = stylesObject[key as TClassName];

      return {
        ...acc,
        [key]: isFunction(styles) ? style(styles({ root })) : style(styles),
      };
    },
    { root } as Record<TClassName, string>,
  );
};
