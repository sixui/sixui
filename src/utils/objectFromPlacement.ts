import type { Alignment, Placement, Side } from '@floating-ui/core';

import type { IPlacement } from '~/helpers/types';

export const objectFromPlacement = (
  placement: Placement | IPlacement,
): IPlacement => {
  if (typeof placement === 'string') {
    const side = placement.split('-')[0] as Side;
    const alignment = placement.split('-')[1] as Alignment | undefined;

    return {
      side,
      alignment,
    };
  }

  return placement;
};
