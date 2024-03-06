import type {
  CompiledStyles,
  StyleXStyles,
} from '@stylexjs/stylex/lib/StyleXTypes';

import type { ICompiledStyles } from './types';

type IOptionalCompiledStyles<IStyleKey extends string> =
  | ICompiledStyles<IStyleKey>
  | undefined;

export type IStylesCombinator<IStyleKey extends string> = (
  ...classNames: Array<IStyleKey | StyleXStyles | null | undefined | false>
) => Array<StyleXStyles>;

export const stylesCombinatorFactory =
  <IStyleKey extends string>(
    ...styles: Array<
      | IOptionalCompiledStyles<IStyleKey>
      | Array<IOptionalCompiledStyles<IStyleKey>>
    >
  ): IStylesCombinator<IStyleKey> =>
  (...styleKeys) =>
    styleKeys
      .map((styleKey) =>
        typeof styleKey === 'string'
          ? (
              styles.flat() as Array<
                IOptionalCompiledStyles<IStyleKey> | undefined
              >
            ).map((style) => (styleKey ? style?.[styleKey] : undefined))
          : styleKey,
      )
      .flat()
      .filter((styleKey) => !!styleKey) as Array<CompiledStyles>;
