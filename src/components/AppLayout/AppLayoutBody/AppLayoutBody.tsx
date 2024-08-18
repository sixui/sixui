import { forwardRef } from 'react';

import type { IAppLayoutBodyProps } from './AppLayoutBody.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { useAppLayoutContext } from '../AppLayout.context';
import { appShellBodyStyles } from './AppLayoutBody.styles';

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
    const appShellContext = useAppLayoutContext();

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppLayoutBody',
      styles: [appShellBodyStyles, styles],
    });

    const standardNavigationDrawerOpened =
      !appShellContext.navigationDrawer?.sideSheet?.isModal &&
      appShellContext.navigationDrawer?.sideSheet?.standardOpened;
    const standardAsideOpened =
      !appShellContext.aside?.sideSheet?.isModal &&
      appShellContext.aside?.sideSheet?.standardOpened;
    const headerOpened = true;

    return (
      <Base
        as='main'
        {...other}
        sx={[
          globalStyles,
          combineStyles(
            'host',
            followNavigationDrawer && 'host$followNavigationDrawer',
            followNavigationDrawer &&
              standardNavigationDrawerOpened &&
              'host$followNavigationDrawer$opened',
            followAside && 'host$followAside',
            followAside && standardAsideOpened && 'host$followAside$opened',
            followHeader && 'host$followHeader',
            followHeader && headerOpened && 'host$followHeader$opened',
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
