import { removeUndefineds } from '@olivierpascal/helpers';

import type { IPaperProps } from './Paper.types';
import { extractBoxProps } from '../Box/extractBoxProps';

export type IUseForwardedPropsResult = {
  paperProps?: IPaperProps;
  other?: Record<string, unknown>;
};

export const extractPaperProps = <TProps extends IPaperProps>(
  props: TProps,
): IUseForwardedPropsResult => {
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
    other: forwardedProps,
  };
};
