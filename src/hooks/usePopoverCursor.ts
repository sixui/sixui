import type { Placement, UseFloatingReturn } from '@floating-ui/react';
import { useCallback } from 'react';

import type { ISize } from '@/helpers/types';

const POPOVER_CURSOR_ARROW_WIDTH = 14;
const POPOVER_CURSOR_ARROW_HEIGHT = 7;
const POPOVER_CURSOR_ARROW_SVG_PATH = undefined;

const POPOVER_CURSOR_DOT_WIDTH = 11;
const POPOVER_CURSOR_DOT_HEIGHT = 11;
const POPOVER_CURSOR_DOT_SVG_PATH =
  'M 5.5,0 A 3,3 0 1,0 5.5,6 A 3,3 0 1,0 5.5,0';

export type IPopoverCursorType = 'arrow' | 'dot' | false;

export type IUsePopoverCursorProps = {
  type: IPopoverCursorType;
};

export type IPopoverCursorTransform = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type IUsePopoverCursorResult = {
  width: number;
  height: number;
  svgPath?: string;
  getTransformOrigin: (floating: UseFloatingReturn) => string;
};

const getAbsoluteTransformOrigin = (placement: Placement): string => {
  switch (placement) {
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

const getCursorTipTransformOrigin = (
  placement: Placement,
  transform: IPopoverCursorTransform,
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

type ICursorProps = {
  size: ISize;
  svgPath?: string;
};

const getCursorProps = (type: IPopoverCursorType): ICursorProps => {
  switch (type) {
    case 'arrow':
      return {
        size: {
          width: POPOVER_CURSOR_ARROW_WIDTH,
          height: POPOVER_CURSOR_ARROW_HEIGHT,
        },
        svgPath: POPOVER_CURSOR_ARROW_SVG_PATH,
      };

    case 'dot':
      return {
        size: {
          width: POPOVER_CURSOR_DOT_WIDTH,
          height: POPOVER_CURSOR_DOT_HEIGHT,
        },
        svgPath: POPOVER_CURSOR_DOT_SVG_PATH,
      };

    default:
      return {
        size: {
          width: 0,
          height: 0,
        },
        svgPath: undefined,
      };
  }
};

export const usePopoverCursor = (
  props: IUsePopoverCursorProps,
): IUsePopoverCursorResult => {
  const { type } = props;
  const cursorProps = getCursorProps(type);

  const getTransformOrigin = useCallback(
    (floating: UseFloatingReturn): string => {
      if (type) {
        const transform: IPopoverCursorTransform = {
          width: cursorProps.size.width,
          height: cursorProps.size.height,
          x: floating.middlewareData.arrow?.x ?? 0 + cursorProps.size.width / 2,
          y: floating.middlewareData.arrow?.y ?? 0 + cursorProps.size.height,
        };
        const transformOrigin = getCursorTipTransformOrigin(
          floating.placement,
          transform,
        );

        return transformOrigin;
      } else {
        const transformOrigin = getAbsoluteTransformOrigin(floating.placement);

        return transformOrigin;
      }
    },
    [type, cursorProps],
  );

  return {
    width: cursorProps.size.width,
    height: cursorProps.size.height,
    svgPath: cursorProps.svgPath,
    getTransformOrigin,
  };
};
