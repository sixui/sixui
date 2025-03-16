import { removeUndefineds } from '@olivierpascal/helpers';

import type { IExtractBoxPropsForwardedProps } from '~/components/Box/extractBoxProps';
import type { IFlexProps } from './Flex.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';

export type IExtractFlexPropsForwardedProps<TForwardedComponentProps> = Omit<
  TForwardedComponentProps,
  keyof IExtractBoxPropsForwardedProps<TForwardedComponentProps>
>;

export interface IExtractFlexPropsResult<TForwardedComponentProps> {
  flexProps?: IFlexProps;
  other: IExtractFlexPropsForwardedProps<TForwardedComponentProps>;
}

export const extractFlexProps = <TForwardedComponentProps>(
  props: IFlexProps,
): IExtractFlexPropsResult<TForwardedComponentProps> => {
  const { align, columnGap, direction, gap, justify, rowGap, wrap, ...other } =
    props;
  const { boxProps, other: otherExceptBoxProps } = extractBoxProps(other);

  const flexProps: IFlexProps = removeUndefineds({
    ...boxProps,
    align,
    columnGap,
    direction,
    gap,
    justify,
    rowGap,
    wrap,
  });

  return {
    flexProps,
    other:
      otherExceptBoxProps as IExtractFlexPropsForwardedProps<TForwardedComponentProps>,
  };
};
