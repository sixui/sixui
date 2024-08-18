import { forwardRef } from 'react';

import type { IAppShellBodyProps } from './AppShellBody.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { useAppShellContext } from '../AppShell.context';
import { appShellBodyStyles } from './AppShellBody.styles';

export const AppShellBody = forwardRef<HTMLDivElement, IAppShellBodyProps>(
  function AppShellBody(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appShellContext = useAppShellContext();

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppShellBody',
      styles: [appShellBodyStyles, styles],
    });

    const isStandardNavigationDrawerOpened =
      !appShellContext.navigationDrawer?.sideSheet?.isModal &&
      appShellContext.navigationDrawer?.sideSheet?.standardOpened;
    const isStandardAsideOpened =
      !appShellContext.aside?.sideSheet?.isModal &&
      appShellContext.aside?.sideSheet?.standardOpened;

    return (
      <Base
        {...other}
        sx={[
          globalStyles,
          combineStyles(
            'host',
            isStandardNavigationDrawerOpened &&
              'host$standardNavigationDrawerOpened',
            isStandardAsideOpened && 'host$standardAsideOpened',
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
