import type { IPaperProps } from './Paper.types';
import { extractBoxProps } from '../Box/extractBoxProps';

export type IUseForwardedPropsResult = {
  paperProps?: IPaperProps;
  other?: Record<string, unknown>;
};

export const extractPaperProps = <TProps extends IPaperProps>(
  props: TProps,
): IUseForwardedPropsResult => {
  const {
    corner,
    cornerTop,
    cornerBottom,
    cornerLeft,
    cornerRight,
    cornerTopLeft,
    cornerTopRight,
    cornerBottomLeft,
    cornerBottomRight,
    surface,
    elevation,
    ...other
  } = props;

  const { boxProps, other: forwardedProps } = extractBoxProps(other);

  const paperProps: IPaperProps = {
    ...boxProps,
    corner,
    cornerTop,
    cornerBottom,
    cornerLeft,
    cornerRight,
    cornerTopLeft,
    cornerTopRight,
    cornerBottomLeft,
    cornerBottomRight,
    surface,
    elevation,
  };

  return {
    paperProps,
    other: forwardedProps,
  };
};
