import type { IPlacement } from '~/utils/types';
import { stringFromPlacement } from '~/utils/stringFromPlacement';

export const getCornerTransformOriginFromPlacement = (
  placement: IPlacement,
): string => {
  const placementString = stringFromPlacement(placement);

  switch (placementString) {
    case 'bottom':
      return '50% 0';
    case 'bottom-start':
      return '0 0';
    case 'bottom-end':
      return '100% 0';

    case 'left':
      return '100% 50%';
    case 'left-start':
      return '100% 0';
    case 'left-end':
      return '100% 100%';

    case 'right':
      return '0 50%';
    case 'right-start':
      return '0 0';
    case 'right-end':
      return '0 100%';

    case 'top':
      return '50% 100%';
    case 'top-start':
      return '0 100%';
    case 'top-end':
    default:
      return '100% 100%';
  }
};
