import type { ISize } from '~/utils/types';

const POPOVER_CURSOR_ARROW_WIDTH = 14;
const POPOVER_CURSOR_ARROW_HEIGHT = 7;
const POPOVER_CURSOR_ARROW_SVG_PATH = undefined;

const POPOVER_CURSOR_DOT_WIDTH = 11;
const POPOVER_CURSOR_DOT_HEIGHT = 11;
const POPOVER_CURSOR_DOT_SVG_PATH =
  'M 5.5,0 A 3,3 0 1,0 5.5,6 A 3,3 0 1,0 5.5,0';

export type IPopoverCursorType = 'arrow' | 'dot' | false;

export type ICursorProps = {
  size: ISize;
  svgPath?: string;
};

export const getCursorProps = (type: IPopoverCursorType): ICursorProps => {
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
