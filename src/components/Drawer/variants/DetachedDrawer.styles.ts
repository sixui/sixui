import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';
import { drawerTokens } from '../Drawer.stylex';

export const detachedDrawerStyles = stylex.create({
  host: {
    [drawerTokens.containerInset]: spacingTokens.padding$4,
  },
});
