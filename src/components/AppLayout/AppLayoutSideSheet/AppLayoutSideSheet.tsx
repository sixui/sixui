import { forwardRef } from 'react';

import type { IAppLayoutSideSheetProps } from './AppLayoutSideSheet.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutSideSheetStyles } from './AppLayoutSideSheet.styles';

export const AppLayoutSideSheet = forwardRef<
  HTMLDivElement,
  IAppLayoutSideSheetProps
>(function AppLayoutSideSheet(props, forwardedRef) {
  const { styles, sx, children, fullHeight, anchor = 'left', ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'AppLayoutSideSheet',
    styles: [appLayoutSideSheetStyles, styles],
  });

  const hasHeader = appLayoutContext.components.includes('header');
  const headerOpened = hasHeader;

  const hasNavigationRail =
    appLayoutContext.components.includes('navigationRail');
  const navigationRailOpened =
    hasNavigationRail && appLayoutContext.navigationMode === 'rail';

  const hasNavigationDrawer =
    appLayoutContext.components.includes('navigationDrawer');
  const standardNavigationDrawerOpened =
    hasNavigationDrawer &&
    appLayoutContext.navigationMode === 'standard' &&
    appLayoutContext.navigationDrawer?.state?.standardOpened;

  const hasAside = appLayoutContext.components.includes('aside');
  const standardAsideOpened =
    hasAside && appLayoutContext.aside?.state?.standardOpened;

  const anchorRight = anchor === 'right';
  const anchorLeft = !anchorRight;

  return (
    <Base
      {...other}
      sx={[
        globalStyles,
        combineStyles(
          'host',
          headerOpened && 'host$headerOpened',
          anchorLeft && navigationRailOpened && 'host$navigationRailOpened',
          anchorLeft &&
            standardNavigationDrawerOpened &&
            'host$standardNavigationDrawerOpened',
          anchorRight && standardAsideOpened && 'host$standardAsideOpened',
          fullHeight && 'host$fullHeight',
        ),
        sx,
      ]}
      ref={forwardedRef}
    >
      <div {...getStyles('inner')}>{children}</div>
    </Base>
  );
});
