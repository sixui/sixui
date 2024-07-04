import type { Placement } from '@floating-ui/react';

export const placementToOrigin = (placement: Placement): string => {
  switch (placement) {
    case 'top':
      return 'bottom';
    case 'top-start':
      return 'bottom left';
    case 'top-end':
      return 'bottom right';
    case 'bottom':
      return 'top';
    case 'bottom-start':
      return 'top left';
    case 'bottom-end':
      return 'top right';
    case 'left':
      return 'right';
    case 'left-start':
      return 'top right';
    case 'left-end':
      return 'bottom right';
    case 'right':
      return 'left';
    case 'right-start':
      return 'top left';
    case 'right-end':
      return 'bottom left';
    default:
      return 'top';
  }
};
