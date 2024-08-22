import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IAppLayoutFooterStylesKey = keyof typeof appLayoutFooterStyles;
export const appLayoutFooterStyles = stylex.create({
  host: {
    borderTopWidth: outlineTokens.width$xs,
    borderTopStyle: 'solid',
    borderTopColor: colorSchemeTokens.outline,
    zIndex: zIndexTokens.app,
    padding: spacingTokens.padding$6,
  },
});
