import { forwardRef } from 'react';

import type { IAppLayoutNavigationProps } from './AppLayoutNavigation.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutNavigationStyles } from './AppLayoutNavigation.styles';

export const AppLayoutNavigation = forwardRef<
  HTMLDivElement,
  IAppLayoutNavigationProps
>(function AppLayoutNavigation(props, forwardedRef) {
  const { styles, sx, children, ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'AppLayoutNavigation',
    styles: [appLayoutNavigationStyles, styles],
  });

  const hasNavigationRail =
    appLayoutContext.components.includes('navigationRail');
  const navigationRailOpened =
    hasNavigationRail &&
    appLayoutContext.canonicalLayout.navigationMode === 'rail';

  const hasNavigationDrawer =
    appLayoutContext.components.includes('navigationDrawer');
  const standardNavigationDrawerOpened =
    hasNavigationDrawer &&
    appLayoutContext.canonicalLayout.navigationMode === 'standard' &&
    appLayoutContext.navigationDrawer?.state?.standardOpened;

  return (
    <Base
      {...other}
      sx={[
        globalStyles,
        combineStyles(
          'host',
          navigationRailOpened && 'host$navigationRailOpened',
          standardNavigationDrawerOpened &&
            'host$standardNavigationDrawerOpened',
        ),
        sx,
      ]}
      ref={forwardedRef}
    >
      <div {...getStyles('inner')}>{children}</div>
    </Base>
  );
});
