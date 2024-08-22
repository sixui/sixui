import stylex from '@stylexjs/stylex';

import { outlineTokens } from '~/themes/base/outline.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutHeaderStylesKey = keyof typeof appLayoutHeaderStyles;
export const appLayoutHeaderStyles = stylex.create({
  host: {
    position: 'sticky',
    top: 0,
    insetInline: 0,

    height: appLayoutTokens.headerHeight,
    zIndex: zIndexTokens.app,
    paddingLeft: spacingTokens.padding$3,
    paddingRight: spacingTokens.padding$3,
  },
  host$divider: {
    borderBottomWidth: outlineTokens.width$xs,
    borderBottomColor: colorSchemeTokens.outline,
    borderBottomStyle: 'solid',
  },
});
