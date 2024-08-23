import stylex from '@stylexjs/stylex';

import { navigationRailTokens } from '~/components/NavigationRail/NavigationRail.stylex';
import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutNavigationRailStylesKey =
  keyof typeof appLayoutNavigationRailStyles;
export const appLayoutNavigationRailStyles = stylex.create({
  host: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: appLayoutTokens.navigationRailWidth,
  },
  navigationRail: {
    height: '100%',
    [navigationRailTokens.dividerColor]: appLayoutTokens.dividerColor,
    [navigationRailTokens.dividerWidth]: appLayoutTokens.dividerWidth,
    [navigationRailTokens.containerWidth]: appLayoutTokens.navigationRailWidth,
  },
});
