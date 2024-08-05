import type {
  CompiledStyles,
  StyleXStyles,
} from '@stylexjs/stylex/lib/StyleXTypes';

import type { ICompiledStyles, IStyleXStyles } from './types';
import { isFunction } from './isFunction';

type IOptionalCompiledStyles<TStyleKey extends string> =
  | ICompiledStyles<TStyleKey>
  | undefined;

export type IStylesCombinatorStylesProp<TStyleKey extends string> = Array<
  IOptionalCompiledStyles<TStyleKey> | Array<IOptionalCompiledStyles<TStyleKey>>
>;

export type IStylesCombinator<TStyleKey extends string> = (
  ...classNames: Array<TStyleKey | IStyleXStyles>
) => Array<StyleXStyles>;

export const stylesCombinatorFactory =
  <TStyleKey extends string>(
    styles: IStylesCombinatorStylesProp<TStyleKey>,
  ): IStylesCombinator<TStyleKey> =>
  (...styleKeys) => {
    const flatStyles = styles.flat() as Array<
      IOptionalCompiledStyles<TStyleKey> | undefined
    >;

    return styleKeys
      .map((styleKey) =>
        typeof styleKey === 'string'
          ? flatStyles.map((style) => {
              const styleValue = style?.[styleKey];

              return (
                isFunction(styleValue) ? styleValue() : styleValue
              ) as StyleXStyles;
            })
          : styleKey,
      )
      .flat()
      .filter((styleKey) => !!styleKey) as Array<CompiledStyles>;
  };
