import * as stylex from '@stylexjs/stylex';

import type { IStylesCombinator } from '@/helpers/stylesCombinatorFactory';
import type { IVisualState } from '@/hooks/useVisualState';
import { dataProps } from '@/helpers/dataProps';
import { IStyleVarsTheme } from './types';
import { CompiledStyles } from '@stylexjs/stylex/lib/StyleXTypes';

type IClassName<IStyleKey extends string> =
  | IStyleKey
  | null
  | undefined
  | false;

export type IStyleProps<
  IStyleKey extends string,
  IStyleVarKey extends string,
> = (
  classNames?: Array<IClassName<IStyleKey> | Array<IClassName<IStyleKey>>>,
  styles?: Array<
    IStyleVarsTheme<IStyleVarKey> | CompiledStyles | null | undefined | false
  >,
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
      ...(styles ?? []),
    ),
    ...dataProps(visualState),
  });
