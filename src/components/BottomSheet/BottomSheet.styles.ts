import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { bottomSheetTokens } from './BottomSheet.stylex';
import { motionTokens } from '~/themes/base/motion.stylex';

export type IBottomSheetStylesKey = keyof typeof bottomSheetStyles;
export const bottomSheetStyles = stylex.create({
  host: {
    position: 'fixed',
    bottom: 0,
    insetInline: 0,
    zIndex: zIndexTokens.modal,
  },
  bottomSheetContent: {
    marginInline: 'auto',
    width: {
      default: `min(100%, 100% - ${bottomSheetTokens.containerSideMargin} * 2)`,
      // '@container compact (min-width: 0)': '100%',
      // TODO: use better media queries
      '@media (min-width: 0) and (max-width: 599)': '100%',
    },
    maxHeight: bottomSheetTokens.containerInitialMaxHeight,
    transitionProperty: 'width',
    transitionDuration: `${motionTokens.duration$short3}, ${motionTokens.duration$short1}`,
    transitionTimingFunction: `${motionTokens.easing$emphasizedAccelerate}, linear`,
  },
  bottomSheetContent$minimized: {
    width: '100%',
  },
});
