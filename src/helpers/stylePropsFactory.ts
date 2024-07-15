import stylex from '@stylexjs/stylex';
import { CompiledStyles } from '@stylexjs/stylex/lib/StyleXTypes';

import type { IStylesCombinator } from '@/helpers/stylesCombinatorFactory';
import type { IVisualState } from '@/components/utils/VisualState';
import type { IStyleVarsTheme, IStyleXStyles } from './types';
import { dataProps } from '@/helpers/dataProps';

type IClassName<TStyleKey extends string> =
  | TStyleKey
  | null
  | undefined
  | false;

type IStyles<TStyleVarKey extends string> =
  | IStyleVarsTheme<TStyleVarKey>
  | CompiledStyles
  | null
  | false
  | undefined;

// FIXME: refactor types
export type IStyleProps<
  TStyleKey extends string,
  TStyleVarKey extends string,
> = (
  ...styleKeys: Array<
    | IClassName<TStyleKey>
    | Array<IClassName<TStyleKey>>
    | IStyleXStyles
    | IStyles<TStyleVarKey>
  >
) => ReturnType<typeof stylex.props> & {
  [key in `data-${keyof IVisualState}`]?: string;
};

export const stylePropsFactory =
  <TStyleKey extends string, TStyleVarKey extends string = never>(
    combineStyles: IStylesCombinator<TStyleKey>,
    visualState?: IVisualState,
  ): IStyleProps<TStyleKey, TStyleVarKey> =>
  (...styleKeys) => ({
    ...stylex.props(
      ...(styleKeys
        ? combineStyles(...(styleKeys.flat() as Array<IClassName<TStyleKey>>))
        : []),
    ),
    ...dataProps(visualState),
  });
