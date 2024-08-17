import { forwardRef } from 'react';

import type { IAppShellMainProps } from './AppShellMain.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { useAppShellContext } from '../AppShell.context';
import { appShellMainStyles } from './AppShellMain.styles';

export const AppShellMain = forwardRef<HTMLDivElement, IAppShellMainProps>(
  function AppShellMain(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appShellContext = useAppShellContext();

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppShellMain',
      styles: [appShellMainStyles, styles],
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
