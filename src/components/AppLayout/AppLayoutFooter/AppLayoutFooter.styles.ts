import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutFooterStylesKey = keyof typeof appLayoutFooterStyles;
export const appLayoutFooterStyles = stylex.create({
  host: {
    zIndex: zIndexTokens.app,
    padding: spacingTokens.padding$6,
  },
  host$divider: {
    borderTopWidth: appLayoutTokens.dividerWidth,
    borderTopColor: appLayoutTokens.dividerColor,
    borderTopStyle: 'solid',
  },
});
