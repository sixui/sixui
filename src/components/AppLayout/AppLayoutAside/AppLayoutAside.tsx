import { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAppLayoutAsideProps } from './AppLayoutAside.types';
import { useStyles } from '~/hooks/useStyles';
import { commonStyles } from '~/helpers/commonStyles';
import { SideSheet } from '~/components/SideSheet';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutAsideStyles } from './AppLayoutAside.styles';

export const AppLayoutAside = forwardRef<HTMLDivElement, IAppLayoutAsideProps>(
  function AppLayoutAside(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appLayoutContext = useAppLayoutContext();

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'AppLayoutAside',
      styles: [appLayoutAsideStyles, styles],
    });

    return (
      <div
        {...getStyles(
          'host',
          appLayoutContext.aside?.fullHeight && 'host$fullHeight',
          !appLayoutContext.aside?.sideSheet?.standardOpened && 'host$collapsed',
        )}
      >
        <SideSheet
          anchor='right'
          root={appLayoutContext.root}
          sx={[globalStyles, combineStyles('sideSheet'), sx]}
          isModal={appLayoutContext.aside?.sideSheet?.isModal}
          standardOpened={appLayoutContext.aside?.sideSheet?.standardOpened}
          modalOpened={appLayoutContext.aside?.sideSheet?.modalOpened}
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
