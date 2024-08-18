import { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAppLayoutAsideProps } from './AppLayoutAside.types';
import { useStyles } from '~/hooks/useStyles';
import { commonStyles } from '~/helpers/commonStyles';
import { SideSheet } from '~/components/SideSheet';
import { useAppLayoutContext } from '../AppLayout.context';
import { appShellAsideStyles } from './AppLayoutAside.styles';

export const AppLayoutAside = forwardRef<HTMLDivElement, IAppLayoutAsideProps>(
  function AppLayoutAside(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appShellContext = useAppLayoutContext();

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'AppLayoutAside',
      styles: [appShellAsideStyles, styles],
    });

    return (
      <div
        {...getStyles(
          'host',
          appShellContext.aside?.fullHeight && 'host$fullHeight',
          !appShellContext.aside?.sideSheet?.standardOpened && 'host$collapsed',
        )}
      >
        <SideSheet
          anchor='right'
          root={appShellContext.root}
          sx={[globalStyles, combineStyles('aside'), sx]}
          isModal={appShellContext.aside?.sideSheet?.isModal}
          standardOpened={appShellContext.aside?.sideSheet?.standardOpened}
          modalOpened={appShellContext.aside?.sideSheet?.modalOpened}
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
  },
);
