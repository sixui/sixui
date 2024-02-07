import stylex from '@stylexjs/stylex';
import { asArray } from '@olivierpascal/helpers';

import type { IStylesCombinator } from '@/helpers/stylesCombinatorFactory';
import type { IVisualState } from '@/hooks/useVisualState';
import type { IZeroOrMore, IStyleVarsTheme } from './types';
import { dataProps } from '@/helpers/dataProps';
import { CompiledStyles } from '@stylexjs/stylex/lib/StyleXTypes';

type IClassName<IStyleKey extends string> =
  | IStyleKey
  | null
  | undefined
  | false;

type IStyles<IStyleKey extends string> =
  | IStyleVarsTheme<IStyleKey>
  | CompiledStyles
  | null
  | false
  | undefined;

export type IStyleProps<
  IStyleKey extends string,
  IStyleVarKey extends string,
> = (
  classNames?: Array<IClassName<IStyleKey> | Array<IClassName<IStyleKey>>>,
  styles?: Array<IZeroOrMore<IStyles<IStyleVarKey>>>,
) => ReturnType<typeof stylex.props> & {
  [key in `data-${keyof IVisualState}`]?: string;
};

export const stylePropsFactory =
  <IStyleKey extends string, IStyleVarKey extends string = never>(
    combineStyles: IStylesCombinator<IStyleKey>,
    visualState?: IVisualState,
  ): IStyleProps<IStyleKey, IStyleVarKey> =>
  (classNames, styles) => ({
    ...stylex.props(
      ...(classNames
        ? combineStyles(...(classNames.flat() as Array<IClassName<IStyleKey>>))
        : []),
      ...(styles ? asArray(styles) : []),
    ),
    ...dataProps(visualState),
  });
