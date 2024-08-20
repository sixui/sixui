import { forwardRef } from 'react';

import type { IAppLayoutBodyProps } from './AppLayoutBody.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutBodyStyles } from './AppLayoutBody.styles';

export const AppLayoutBody = forwardRef<HTMLDivElement, IAppLayoutBodyProps>(
  function AppLayoutBody(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      followNavigationDrawer,
      followAside,
      followHeader,
      ...other
    } = props;
    const appLayoutContext = useAppLayoutContext();

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppLayoutBody',
      styles: [appLayoutBodyStyles, styles],
    });

    const hasHeader = appLayoutContext.components.includes('header');
    const hasHeaderOpened = hasHeader;

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

    // const hasAside = !!appLayoutContext.aside;
    // const hasAsideOpened =
    //   hasAside && appLayoutContext.aside?.sideSheet?.standardOpened;

    return (
      <Base
        as='main'
        {...other}
        sx={[
          globalStyles,
          combineStyles(
            'host',
            hasHeader && 'host$hasHeader',
            standardNavigationDrawerOpened &&
              'host$standardNavigationDrawerOpened',
            navigationRailOpened && 'host$navigationRailOpened',
            // hasHeaderOpened && 'host$hasHeader$opened',
            // hasNavigationDrawer && 'host$hasNavigationDrawer',
            // hasNavigationRail && 'host$hasNavigationRail',
            // hasNavigationDrawerOpened && 'host$hasNavigationDrawer$opened',
            // hasNavigationRailOpened && 'host$hasNavigationRail$opened',
            // // hasNavigationRail && hasNavigationDrawer && 'host$hasBothNavigation$railOpened',
            // hasAside && 'host$hasAside',
            // hasAsideOpened && 'host$followAside$opened',
          ),
          sx,
        ]}
        ref={forwardedRef}
      >
        {children}
      </Base>
    );
  },
);
