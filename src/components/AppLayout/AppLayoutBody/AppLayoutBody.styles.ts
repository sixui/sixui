import stylex from '@stylexjs/stylex';

import { motionTokens } from '~/themes/base/motion.stylex';
import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutBodyStylesKey = keyof typeof appLayoutBodyStyles;
export const appLayoutBodyStyles = stylex.create({
  host: {
    flexGrow: 1,
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
    minHeight: '100vh',
  },
  host$hasHeader: {
    minHeight: `calc(100vh - ${appLayoutTokens.headerHeight})`,
  },
});
