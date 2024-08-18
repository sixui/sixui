import { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAppShellAsideProps } from './AppShellAside.types';
import { useStyles } from '~/hooks/useStyles';
import { commonStyles } from '~/helpers/commonStyles';
import { SideSheet } from '~/components/SideSheet';
import { useAppShellContext } from '../AppShell.context';
import { appShellAsideStyles } from './AppShellAside.styles';

export const AppShellAside = forwardRef<HTMLDivElement, IAppShellAsideProps>(
  function AppShellAside(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appShellContext = useAppShellContext();

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'AppShellAside',
      styles: [appShellAsideStyles, styles],
    });

    return (
      <div {...getStyles('host')}>
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
