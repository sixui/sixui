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

    return (
      <Base
        {...other}
        sx={[
          globalStyles,
          combineStyles(
            'host',
            (appShellContext.navigationDrawer?.sideSheet?.isModal ||
              !appShellContext.navigationDrawer?.sideSheet?.standardOpened) &&
              'host$expanded',
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
