import stylex from '@stylexjs/stylex';

import { navigationRailTokens } from './NavigationRail.stylex';
import { paperBaseTokens } from '../PaperBase/PaperBase.stylex';

export type INavigationRailStylesKey = keyof typeof navigationRailStyles;
export const navigationRailStyles = stylex.create({
  host: {
    width: navigationRailTokens.containerWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: navigationRailTokens.gap,

    [paperBaseTokens.containerColor]: navigationRailTokens.containerColor,
    [paperBaseTokens.containerShape$bottomLeft]:
      navigationRailTokens.containerShape,
    [paperBaseTokens.containerShape$bottomRight]:
      navigationRailTokens.containerShape,
    [paperBaseTokens.containerShape$topLeft]:
      navigationRailTokens.containerShape,
    [paperBaseTokens.containerShape$topRight]:
      navigationRailTokens.containerShape,
    [paperBaseTokens.containerElevation]:
      navigationRailTokens.containerElevation,
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    gap: navigationRailTokens.groupGap,
    overflowY: 'auto',
    paddingTop: navigationRailTokens.groupTopSpace,
    paddingBottom: navigationRailTokens.groupBottomSpace,
  },
  group$start: {
    justifyContent: 'start',
  },
  group$center: {
    justifyContent: 'center',
  },
  group$end: {
    justifyContent: 'end',
  },
});
