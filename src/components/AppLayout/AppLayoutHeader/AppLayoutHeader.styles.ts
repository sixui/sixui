import stylex from '@stylexjs/stylex';

import { outlineTokens } from '~/themes/base/outline.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { appShellTokens } from '../AppLayout.stylex';
import { zIndexTokens } from '~/themes/base/zIndex.stylex';

export type IAppLayoutHeaderStylesKey = keyof typeof appShellHeaderStyles;
export const appShellHeaderStyles = stylex.create({
  host: {
    position: 'sticky',
    top: 0,
    insetInline: 0,

    height: appShellTokens.headerHeight,
    borderBottomWidth: outlineTokens.width$xs,
    borderBottomStyle: 'solid',
    borderBottomColor: colorSchemeTokens.outline,
    backgroundColor: '#ccc',
    zIndex: zIndexTokens.app,
  },
});
