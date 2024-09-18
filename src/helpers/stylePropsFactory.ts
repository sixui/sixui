import stylex from '@stylexjs/stylex';
import { CompiledStyles } from '@stylexjs/stylex/lib/StyleXTypes';

import type { IVisualState } from '~/components/VisualState';
import type { IStylesCombinator } from '~/helpers/stylesCombinatorFactory';
import type { IStyleXStyles } from './types';
import { dataProps } from '~/helpers/dataProps';

type IStyleKey<TStyleKey extends string> = TStyleKey | null | undefined | false;
type ITheme = CompiledStyles | null | undefined | false;

export type IStyleProps<TStyleKey extends string> = (
  ...styleKeys: Array<
    IStyleKey<TStyleKey> | Array<IStyleKey<TStyleKey>> | IStyleXStyles | ITheme
  >
) => ReturnType<typeof stylex.props> & {
  [key in `data-${keyof IVisualState}`]?: string;
};

export const stylePropsFactory =
  <TStyleKey extends string>(
    combineStyles: IStylesCombinator<TStyleKey>,
    visualState?: IVisualState,
  ): IStyleProps<TStyleKey> =>
  (...styleKeys) => ({
    ...stylex.props(
      ...(styleKeys
        ? combineStyles(...(styleKeys.flat() as Array<IStyleKey<TStyleKey>>))
        : []),
    ),
    ...dataProps(visualState),
  });
