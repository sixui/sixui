import { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAppLayoutNavigationDrawerProps } from './AppLayoutNavigationDrawer.types';
import { useStyles } from '~/hooks/useStyles';
import { commonStyles } from '~/helpers/commonStyles';
import { SideSheet } from '~/components/SideSheet';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutNavigationDrawerStyles } from './AppLayoutNavigationDrawer.styles';

export const AppLayoutNavigationDrawer = forwardRef<
  HTMLDivElement,
  IAppLayoutNavigationDrawerProps
>(function AppLayoutNavigationDrawer(props, forwardedRef) {
  const { styles, sx, children, ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'AppLayoutNavigationDrawer',
    styles: [appLayoutNavigationDrawerStyles, styles],
  });

  const contextProps = appLayoutContext.navigationDrawer;
  if (!contextProps) {
    return null;
  }

  return (
    <div {...getStyles('host', contextProps.fullHeight && 'host$fullHeight')}>
      <SideSheet
        as='nav'
        anchor='left'
        root={appLayoutContext.root}
        sx={[globalStyles, combineStyles('sideSheet'), sx]}
        type={contextProps.state.type}
        standardOpened={contextProps.state.standardOpened}
        modalOpened={contextProps.state.modalOpened}
        onClose={contextProps.state.close}
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
