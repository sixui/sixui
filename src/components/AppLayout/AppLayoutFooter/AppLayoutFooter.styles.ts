import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { appShellTokens } from '../AppLayout.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IAppLayoutFooterStylesKey = keyof typeof appShellFooterStyles;
export const appShellFooterStyles = stylex.create({
  host: {
    backgroundColor: colorSchemeTokens.surface,
    height: appShellTokens.footerHeight,
    borderTopWidth: outlineTokens.width$xs,
    borderTopStyle: 'solid',
    borderTopColor: colorSchemeTokens.outline,
    zIndex: zIndexTokens.app,
    padding: spacingTokens.padding$6,
  },
});
