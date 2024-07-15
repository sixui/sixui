import stylex from '@stylexjs/stylex';

import type { IStylesCombinator } from '@/helpers/stylesCombinatorFactory';
import type { IVisualState } from '@/components/utils/VisualState';
import type { IStyleXStyles } from './types';
import { dataProps } from '@/helpers/dataProps';

type IClassName<TStyleKey extends string> =
  | TStyleKey
  | null
  | undefined
  | false;

export type IStyleProps<TStyleKey extends string> = (
  ...styleKeys: Array<
    IClassName<TStyleKey> | Array<IClassName<TStyleKey>> | IStyleXStyles
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
        ? combineStyles(...(styleKeys.flat() as Array<IClassName<TStyleKey>>))
        : []),
    ),
    ...dataProps(visualState),
  });
