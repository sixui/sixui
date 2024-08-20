import stylex from '@stylexjs/stylex';

import { outlineTokens } from '~/themes/base/outline.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutNavigationRailStylesKey =
  keyof typeof appLayoutNavigationRailStyles;
export const appLayoutNavigationRailStyles = stylex.create({
  host: {
    height: `calc(100vh - ${appLayoutTokens.headerHeight})`,
    border: '1px solid red',

    position: 'sticky',
    flexShrink: 0,
    width: appLayoutTokens.navigationRailWidth,
    top: appLayoutTokens.headerHeight,

    borderRightWidth: outlineTokens.width$xs,
    borderRightStyle: 'solid',
    borderRightColor: colorSchemeTokens.outline,
  },
  host$fullHeight: {
    height: '100vh',
    top: 0,
  },
});
