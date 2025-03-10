import { removeUndefineds } from '@olivierpascal/helpers';

import type { IExtractBoxPropsForwardedProps } from '~/components/Box/extractBoxProps';
import type { IPaperProps } from './Paper.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';

export type IExtractPaperPropsForwardedProps<TForwardedComponentProps> = Omit<
  TForwardedComponentProps,
  keyof IExtractBoxPropsForwardedProps<TForwardedComponentProps>
>;

export interface IExtractPaperPropsResult<TForwardedComponentProps> {
  paperProps?: IPaperProps;
  other: IExtractPaperPropsForwardedProps<TForwardedComponentProps>;
}

export const extractPaperProps = <TForwardedComponentProps>(
  props: IPaperProps,
): IExtractPaperPropsResult<TForwardedComponentProps> => {
  const { shape, outline, outlineStyle, elevation, surface, ...other } = props;
  const { boxProps, other: forwardedProps } = extractBoxProps(other);

  const paperProps: IPaperProps = removeUndefineds({
    ...boxProps,
    shape,
    outline,
    outlineStyle,
    elevation,
    surface,
  });

  return {
    paperProps,
    other:
      forwardedProps as IExtractPaperPropsForwardedProps<TForwardedComponentProps>,
  };
};
