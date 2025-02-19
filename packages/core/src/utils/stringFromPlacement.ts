import type { Placement } from '@floating-ui/core';

import type { IPlacement } from '~/utils/types';

export const stringFromPlacement = (
  placement: Placement | IPlacement,
): Placement =>
  typeof placement === 'string'
    ? placement
    : placement.alignment
      ? `${placement.side}-${placement.alignment}`
      : placement.side;
