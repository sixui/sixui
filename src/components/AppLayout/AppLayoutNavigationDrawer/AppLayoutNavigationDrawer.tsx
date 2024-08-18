import { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAppLayoutNavigationDrawerProps } from './AppLayoutNavigationDrawer.types';
import { useStyles } from '~/hooks/useStyles';
import { commonStyles } from '~/helpers/commonStyles';
import { SideSheet } from '~/components/SideSheet';
import { useAppLayoutContext } from '../AppLayout.context';
import { appShellNavigationDrawerStyles } from './AppLayoutNavigationDrawer.styles';

export const AppLayoutNavigationDrawer = forwardRef<
  HTMLDivElement,
  IAppLayoutNavigationDrawerProps
>(function AppLayoutNavigationDrawer(props, forwardedRef) {
  const { styles, sx, children, ...other } = props;
  const appShellContext = useAppLayoutContext();

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'AppLayoutNavigationDrawer',
    styles: [appShellNavigationDrawerStyles, styles],
  });

  return (
    <div
      {...getStyles(
        'host',
        appShellContext.navigationDrawer?.fullHeight && 'host$fullHeight',
        !appShellContext.navigationDrawer?.sideSheet?.standardOpened &&
          'host$collapsed',
      )}
    >
      <SideSheet
        as='nav'
        anchor='left'
        root={appShellContext.root}
        sx={[globalStyles, combineStyles('sideSheet'), sx]}
        isModal={appShellContext.navigationDrawer?.sideSheet?.isModal}
        standardOpened={
          appShellContext.navigationDrawer?.sideSheet?.standardOpened
        }
        modalOpened={appShellContext.navigationDrawer?.sideSheet?.modalOpened}
        {...other}
        ref={forwardedRef}
      >
        <>
          {/* This is a hack to prevent the first focusable element from being
          focused when the side sheet is opened. */}
          <button
            aria-hidden
            type='button'
            {...stylex.props(commonStyles.outOfScreen)}
          />

          {children}
        </>
      </SideSheet>
    </div>
  );
});
