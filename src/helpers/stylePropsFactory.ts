import stylex, { type StyleXStyles } from '@stylexjs/stylex';
import { asArray } from '@olivierpascal/helpers';
import { CompiledStyles } from '@stylexjs/stylex/lib/StyleXTypes';

import type { IStylesCombinator } from '@/helpers/stylesCombinatorFactory';
import type { IVisualState } from '@/hooks/useVisualState.old';
import type { IZeroOrMore, IStyleVarsTheme } from './types';
import { dataProps } from '@/helpers/dataProps';

type IClassName<IStyleKey extends string> =
  | IStyleKey
  | null
  | undefined
  | false;

type IStyles<IStyleVarKey extends string> =
  | IStyleVarsTheme<IStyleVarKey>
  | CompiledStyles
  | null
  | false
  | undefined;

export type IStyleProps<
  IStyleKey extends string,
  IStyleVarKey extends string,
> = (
  styleKeys?: Array<
    IClassName<IStyleKey> | Array<IClassName<IStyleKey>> | StyleXStyles
  >,
  styles?: Array<IZeroOrMore<IStyles<IStyleVarKey>>>,
) => ReturnType<typeof stylex.props> & {
  [key in `data-${keyof IVisualState}`]?: string;
};

export const stylePropsFactory =
  <IStyleKey extends string, IStyleVarKey extends string = never>(
    combineStyles: IStylesCombinator<IStyleKey>,
    visualState?: IVisualState,
  ): IStyleProps<IStyleKey, IStyleVarKey> =>
  (styleKeys, styles) => ({
    ...stylex.props(
      ...(styleKeys
        ? combineStyles(...(styleKeys.flat() as Array<IClassName<IStyleKey>>))
        : []),
      ...(styles ? asArray(styles) : []),
    ),
    ...dataProps(visualState),
  });
