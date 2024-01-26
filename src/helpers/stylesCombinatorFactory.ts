import type { CompiledStyles } from '@stylexjs/stylex/lib/StyleXTypes';

import type { ICompiledStyles } from './types';

type IOptionalCompiledStyles<IStyleKey extends string> =
  | ICompiledStyles<IStyleKey>
  | undefined;

export type IStylesCombinator<IStyleKey extends string> = (
  ...classNames: Array<IStyleKey | null | undefined | false>
) => Array<CompiledStyles | null | undefined | false>;

export const stylesCombinatorFactory =
  <IStyleKey extends string>(
    ...styles: Array<
      | IOptionalCompiledStyles<IStyleKey>
      | Array<IOptionalCompiledStyles<IStyleKey>>
    >
  ): IStylesCombinator<IStyleKey> =>
  (...classNames) =>
    classNames
      .map((className) =>
        (
          styles.flat() as Array<IOptionalCompiledStyles<IStyleKey> | undefined>
        ).map((style) => (className ? style?.[className] : undefined)),
      )
      .flat();
