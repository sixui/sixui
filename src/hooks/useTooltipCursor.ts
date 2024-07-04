import type { Placement, UseFloatingReturn } from '@floating-ui/react';
import { useCallback } from 'react';

const TOOLTIP_ARROW_WIDTH = 14;
const TOOLTIP_ARROW_HEIGHT = 7;
const TOOLTIP_ARROW_SVG_PATH = undefined;

const TOOLTIP_DOT_WIDTH = 11;
const TOOLTIP_DOT_HEIGHT = 11;
const TOOLTIP_DOT_SVG_PATH = 'M 5.5,0 A 3,3 0 1,0 5.5,6 A 3,3 0 1,0 5.5,0';

export type ITooltipCursorType = 'arrow' | 'dot' | false;

export type IUseTooltipCursorProps = {
  type: ITooltipCursorType;
};

export type ITooltipCursorTransform = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type IUseTooltipCursorResult = {
  width: number;
  height: number;
  svgPath?: string;
  getTransformOrigin: (floating: UseFloatingReturn) => string;
};

const placementToCursorTip = (
  placement: Placement,
  transform: ITooltipCursorTransform,
): string => {
  switch (placement) {
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      return `${transform.x}px ${-transform.height}px`;

    case 'left':
    case 'left-start':
    case 'left-end':
      return `calc(100% + ${transform.height}px) ${transform.y}px`;

    case 'right':
    case 'right-start':
    case 'right-end':
      return `${-transform.height}px ${transform.y}px`;

    case 'top':
    case 'top-start':
    case 'top-end':
    default:
      return `${transform.x}px calc(100% + ${transform.height}px)`;
  }
};

export const useTooltipCursor = (
  props: IUseTooltipCursorProps,
): IUseTooltipCursorResult | undefined => {
  const { type } = props;
  const width = type === 'dot' ? TOOLTIP_DOT_WIDTH : TOOLTIP_ARROW_WIDTH;
  const height =
    props.type === 'dot' ? TOOLTIP_DOT_HEIGHT : TOOLTIP_ARROW_HEIGHT;
  const svgPath =
    props.type === 'dot' ? TOOLTIP_DOT_SVG_PATH : TOOLTIP_ARROW_SVG_PATH;

  const getTransformOrigin = useCallback(
    (floating: UseFloatingReturn): string =>
      placementToCursorTip(floating.placement, {
        width,
        height,
        x: floating.middlewareData.arrow?.x ?? 0 + width / 2,
        y: floating.middlewareData.arrow?.y ?? 0 + height,
      }),
    [width, height],
  );

  return type ? { width, height, svgPath, getTransformOrigin } : undefined;
};
