import type { Placement } from '@floating-ui/react';

type IPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export const getPositionFromPlacement = (placement: Placement): IPosition => {
  switch (placement) {
    case 'bottom':
      return {
        top: '100%',
        left: '-25%',
      };
    case 'bottom-start':
      return {
        top: '100%',
        left: '0',
      };
    case 'bottom-end':
      return {
        top: '100%',
        right: '0',
      };

    case 'left':
      return {
        top: '-25%',
        right: '100%',
      };
    case 'left-start':
      return {
        top: '0',
        right: '100%',
      };
    case 'left-end':
      return {
        bottom: '0',
        right: '100%',
      };

    case 'right':
      return {
        top: '-25%',
        left: '100%',
      };
    case 'right-start':
      return {
        top: '0',
        left: '100%',
      };
    case 'right-end':
      return {
        bottom: '0',
        left: '100%',
      };

    case 'top':
      return {
        bottom: '100%',
        left: '-25%',
      };
    case 'top-start':
      return {
        bottom: '100%',
        left: '0',
      };
    case 'top-end':
    default:
      return {
        bottom: '100%',
        right: '0',
      };
  }
};
