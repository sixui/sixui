import { forwardRef } from 'react';

import type { IAppShellBodyProps } from './AppShellBody.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { useAppShellContext } from '../AppShell.context';
import { appShellBodyStyles } from './AppShellBody.styles';

export const AppShellBody = forwardRef<HTMLDivElement, IAppShellBodyProps>(
  function AppShellBody(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      hasLeftSideSheet,
      leftSideSheetOpened,
      hasRightSideSheet,
      rightSideSheetOpened,
      ...other
    } = props;
    const appShellContext = useAppShellContext();

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppShellBody',
      styles: [appShellBodyStyles, styles],
    });

    return (
      <Base
        as='main'
        {...other}
        sx={[
          globalStyles,
          combineStyles(
            'host',
            hasLeftSideSheet && 'host$hasLeftSideSheet',
            hasLeftSideSheet &&
              leftSideSheetOpened &&
              'host$hasLeftSideSheet$opened',
            hasRightSideSheet && 'host$hasRightSideSheet',
            hasRightSideSheet &&
              rightSideSheetOpened &&
              'host$hasRightSideSheet$opened',
            !appShellContext.navigationDrawer?.fullHeight && 'host$withHeader',
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
