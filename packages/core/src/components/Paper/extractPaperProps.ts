import { removeUndefineds } from '@olivierpascal/helpers';

import type { IPaperProps } from './Paper.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';

export type IExtractPaperPropsResult = {
  paperProps?: IPaperProps;
  other: Record<string, unknown>;
};

export const extractPaperProps = (
  props: IPaperProps,
): IExtractPaperPropsResult => {
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
