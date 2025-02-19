import type { Placement } from '@floating-ui/core';

import type { IPosition, ISize } from '~/utils/types';

export type IPopoverCursor = {
  position: IPosition;
  size: ISize;
};

export const getCursorTipTransformOrigin = (
  placement: Placement,
  cursor: IPopoverCursor,
): string => {
  switch (placement) {
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      return `${cursor.position.x}px ${-cursor.size.height}px`;

    case 'left':
    case 'left-start':
    case 'left-end':
      return `calc(100% + ${cursor.size.height}px) ${cursor.position.y}px`;

    case 'right':
    case 'right-start':
    case 'right-end':
      return `${-cursor.size.height}px ${cursor.position.y}px`;

    case 'top':
    case 'top-start':
    case 'top-end':
    default:
      return `${cursor.position.x}px calc(100% + ${cursor.size.height}px)`;
  }
};
