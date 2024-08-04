import type {
  CompiledStyles,
  StyleXStyles,
} from '@stylexjs/stylex/lib/StyleXTypes';

import type { ICompiledStyles, IStyleXStyles } from './types';

type IOptionalCompiledStyles<TStyleKey extends string> =
  | ICompiledStyles<TStyleKey>
  | undefined;

export type IStylesCombinator<TStyleKey extends string> = (
  ...classNames: Array<TStyleKey | IStyleXStyles>
) => Array<StyleXStyles>;

export const stylesCombinatorFactory =
  <TStyleKey extends string>(
    ...styles: Array<
      | IOptionalCompiledStyles<TStyleKey>
      | Array<IOptionalCompiledStyles<TStyleKey>>
    >
  ): IStylesCombinator<TStyleKey> =>
  (...styleKeys) =>
    styleKeys
      .map((styleKey) =>
        typeof styleKey === 'string'
          ? (
              styles.flat() as Array<
                IOptionalCompiledStyles<TStyleKey> | undefined
              >
            ).map((style) => (styleKey ? style?.[styleKey] : undefined))
          : styleKey,
      )
      .flat()
      .filter((styleKey) => !!styleKey) as Array<CompiledStyles>;
