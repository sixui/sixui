import { forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMergeRefs } from '@floating-ui/react';

import type { IAppLayoutNavigationDrawerProps } from './AppLayoutNavigationDrawer.types';
import { useStyles } from '~/hooks/useStyles';
import { FloatingTransition } from '~/components/FloatingTransition';
import { SideSheetContent } from '~/components/SideSheetContent';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutNavigationDrawerStyles } from './AppLayoutNavigationDrawer.styles';

export const AppLayoutNavigationDrawer = forwardRef<
  HTMLDivElement,
  IAppLayoutNavigationDrawerProps
>(function AppLayoutNavigationDrawer(props, forwardedRef) {
  const { styles, sx, ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'AppLayoutNavigationDrawer',
    styles: [appLayoutNavigationDrawerStyles, styles],
  });

  const transitionNodeRef = useRef<HTMLDivElement>(null);
  const transitionNodeHandleRef = useMergeRefs([
    transitionNodeRef,
    forwardedRef,
  ]);

  const hasNavigationDrawer =
    appLayoutContext.components.includes('navigationDrawer');
  if (!hasNavigationDrawer) {
    return null;
  }

  const standardNavigationDrawerOpened =
    appLayoutContext.canonicalLayout.navigationMode === 'standard' &&
    appLayoutContext.navigationDrawer?.state?.standardOpened;

  // const contextProps = appLayoutContext.navigationDrawer;

  const anchor = 'left';

  return (
    // <div
    //   {...getStyles(
    //     'host',
    //     // contextProps?.state?.standardOpened && 'host$standard$opened',
    //     // hasNavigationRail && 'host$hasNavigationRail',
    //     // hasNavigationRailOpened && 'host$hasNavigationRail$opened',
    //     // contextProps?.fullHeight && 'host$fullHeight',
    //   )}
    // >
    <CSSTransition
      nodeRef={transitionNodeRef}
      in={standardNavigationDrawerOpened}
      timeout={550} // motionTokens.duration$long3
      unmountOnExit
    >
      {(status) => (
        <FloatingTransition
          status={status}
          placement={anchor}
          origin='edge'
          pattern='enterExitOffScreen'
          sx={combineStyles('host')}
          ref={transitionNodeHandleRef}
        >
          <SideSheetContent
            anchor={anchor}
            {...other}
            variant='standard'
            sx={[globalStyles, combineStyles('inner'), sx]}
          />
        </FloatingTransition>
      )}
    </CSSTransition>
  );

  {
    /* <SideSheet
        as='nav'
        anchor='left'
        root={appLayoutContext.root}
        sx={[globalStyles, combineStyles('inner'), sx]}
        type={contextProps?.state?.type}
        standardOpened={contextProps?.state?.standardOpened}
        modalOpened={contextProps?.state?.modalOpened}
        onClose={contextProps?.state?.close}
        divider
        {...other}
        ref={forwardedRef}
      >
        <>


          {children}
        </>
      </SideSheet> */
  }
  // </div>
});
