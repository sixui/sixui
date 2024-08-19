import stylex from '@stylexjs/stylex';

import { navigationRailTokens } from './NavigationRail.stylex';
import { paperBaseTokens } from '../PaperBase/PaperBase.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type INavigationRailStylesKey = keyof typeof navigationRailStyles;
export const navigationRailStyles = stylex.create({
  host: {
    width: navigationRailTokens.containerWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: navigationRailTokens.topSpace,
    paddingBottom: navigationRailTokens.bottomSpace,
    gap: spacingTokens.padding$3,

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
    gap: navigationRailTokens.gap,
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
