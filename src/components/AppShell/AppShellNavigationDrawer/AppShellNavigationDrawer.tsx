import { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAppShellNavigationDrawerProps } from './AppShellNavigationDrawer.types';
import { useStyles } from '~/hooks/useStyles';
import { commonStyles } from '~/helpers/commonStyles';
import { SideSheet } from '~/components/SideSheet';
import { Button } from '~/components/Button';
import { useAppShellContext } from '../AppShell.context';
import { appShellNavigationDrawerStyles } from './AppShellNavigationDrawer.styles';

export const AppShellNavigationDrawer = forwardRef<
  HTMLDivElement,
  IAppShellNavigationDrawerProps
>(function AppShellNavigationDrawer(props, forwardedRef) {
  const { styles, sx, children, ...other } = props;
  const appShellContext = useAppShellContext();

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'AppShellNavigationDrawer',
    styles: [appShellNavigationDrawerStyles, styles],
  });

  return (
    <div {...getStyles('host')}>
      <SideSheet
        anchor='left'
        root={appShellContext.root}
        sx={[globalStyles, combineStyles('host'), sx]}
        isModal={appShellContext.navigationDrawer?.sideSheet?.isModal}
        standardOpened={
          appShellContext.navigationDrawer?.sideSheet?.standardOpened
        }
        modalOpened={appShellContext.navigationDrawer?.sideSheet?.modalOpened}
        {...other}
        ref={forwardedRef}
      >
        {({ close }) => (
          <>
            {/* This is a hack to prevent the first focusable element from being
          focused when the side sheet is opened. */}
            <button
              aria-hidden
              type='button'
              {...stylex.props(commonStyles.outOfScreen)}
            />

            <Button onClick={close} variant='text'>
              Close
            </Button>

            {children}
          </>
        )}
      </SideSheet>
    </div>
  );
});
