import type { UseFloatingReturn } from '@floating-ui/react';
import { useCallback } from 'react';

import type { ISize } from '~/utils/types';
import type { IPopoverCursorType } from './getCursorProps';
import type { IPopoverCursor } from './getCursorTipTransformOrigin';
import { getCursorProps } from './getCursorProps';
import { getCursorTipTransformOrigin } from './getCursorTipTransformOrigin';

export type IUsePopoverCursorProps = {
  type: IPopoverCursorType;
};

export type IUsePopoverCursorResult = {
  size: ISize;
  svgPath?: string;
  getTransformOrigin: (floating: UseFloatingReturn) => string | undefined;
};

export const usePopoverCursor = (
  props: IUsePopoverCursorProps,
): IUsePopoverCursorResult => {
  const { type } = props;
  const cursorProps = getCursorProps(type);

  const getTransformOrigin = useCallback(
    (floating: UseFloatingReturn): string => {
      const cursor: IPopoverCursor = {
        size: cursorProps.size,
        position: {
          x: floating.middlewareData.arrow?.x ?? 0 + cursorProps.size.width / 2,
          y: floating.middlewareData.arrow?.y ?? 0 + cursorProps.size.height,
        },
      };
      const transformOrigin = getCursorTipTransformOrigin(
        floating.placement,
        cursor,
      );

      return transformOrigin;
    },
    [cursorProps],
  );

  return {
    size: cursorProps.size,
    svgPath: cursorProps.svgPath,
    getTransformOrigin,
  };
};
