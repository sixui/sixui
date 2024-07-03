import type { Placement } from '@floating-ui/react';

export type IPlacementToArrowTipProps = {
  transformX: number;
  transformY: number;
  arrowWidth: number;
  arrowHeight: number;
};

export const placementToArrowTip = (
  placement: Placement,
  props: IPlacementToArrowTipProps,
): string => {
  switch (placement) {
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      return `${props.transformX}px ${-props.arrowHeight}px`;

    case 'left':
    case 'left-start':
    case 'left-end':
      return `calc(100% + ${props.arrowHeight}px) ${props.transformY}px`;

    case 'right':
    case 'right-start':
    case 'right-end':
      return `${-props.arrowHeight}px ${props.transformY}px`;

    case 'top':
    case 'top-start':
    case 'top-end':
    default:
      return `${props.transformX}px calc(100% + ${props.arrowHeight}px)`;
  }
};
