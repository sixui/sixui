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

    const hasHeader = !!appLayoutContext.header;
    const hasHeaderOpened = true;

    const hasNavigationRail =
      !!appLayoutContext.navigationRail &&
      appLayoutContext.canonicalLayout.navigationMode === 'rail';

    const hasNavigationDrawer = !!appLayoutContext.navigationDrawer;
    const hasNavigationDrawerOpened =
      hasNavigationDrawer &&
      appLayoutContext.navigationDrawer?.state.standardOpened;
    console.log('_x', { hasNavigationDrawer, hasNavigationDrawerOpened });

    const hasAside = !!appLayoutContext.aside;
    const hasAsideOpened =
      hasAside && appLayoutContext.aside?.sideSheet?.standardOpened;

    return (
      <Base
        as='main'
        {...other}
        sx={[
          globalStyles,
          combineStyles(
            'host',
            hasHeader && 'host$hasHeader',
            hasHeaderOpened && 'host$hasHeader$opened',
            hasNavigationRail && 'host$hasNavigationRail',
            hasNavigationDrawer && 'host$hasNavigationDrawer',
            hasNavigationDrawerOpened && 'host$hasNavigationDrawer$opened',
            hasAside && 'host$hasAside',
            hasAsideOpened && 'host$followAside$opened',
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
