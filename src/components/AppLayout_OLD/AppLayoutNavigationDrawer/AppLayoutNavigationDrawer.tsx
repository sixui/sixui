import { forwardRef, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { CSSTransition } from 'react-transition-group';

import type { ISideSheetContentStylesKey } from '~/components/SideSheetContent';
import type { IAppLayoutNavigationDrawerStylesKey } from './AppLayoutNavigationDrawer.styles';
import type { IAppLayoutNavigationDrawerProps } from './AppLayoutNavigationDrawer.types';
import { Drawer } from '~/components/Drawer';
import { FloatingTransition } from '~/components/FloatingTransition';
import { NavigationDrawerContent } from '~/components/NavigationDrawerContent';
import { SideSheetContent } from '~/components/SideSheetContent';
import { useStyles } from '~/hooks/useStyles';
import { useAppLayoutContext } from '../AppLayout.context';
import {
  appLayoutNavigationDrawerSideSheetContentStyles,
  appLayoutNavigationDrawerStyles,
} from './AppLayoutNavigationDrawer.styles';

export const AppLayoutNavigationDrawer = forwardRef<
  HTMLDivElement,
  IAppLayoutNavigationDrawerProps
>(function AppLayoutNavigationDrawer(props, forwardedRef) {
  const { styles, sx, detached, ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  const { combineStyles, globalStyles } = useStyles<
    ISideSheetContentStylesKey | IAppLayoutNavigationDrawerStylesKey
  >({
    componentName: 'AppLayoutNavigationDrawer',
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
    appLayoutContext.navigationDrawer?.state?.standardOpened;
  const modalNavigationDrawerOpened =
    appLayoutContext.navigationDrawer?.state?.modalOpened;

  const anchor = 'left';

  const renderContent = (
    props?: Partial<React.ComponentPropsWithRef<typeof SideSheetContent>>,
  ): React.JSX.Element => (
    <NavigationDrawerContent
      side={anchor}
      innerStyles={{
        sideSheetContent: appLayoutNavigationDrawerSideSheetContentStyles,
      }}
      {...other}
      {...props}
      sx={[
        globalStyles,
        combineStyles('navigationDrawerContent'),
        props?.sx,
        sx,
      ]}
    />
  );

  return (
    <>
      <Drawer
        root={appLayoutContext.root}
        opened={modalNavigationDrawerOpened}
        onClose={appLayoutContext.navigationDrawer?.state?.close}
        anchor={anchor}
        detached={detached}
        sx={combineStyles('host')}
      >
        {({ close }) =>
          renderContent({
            showCloseButton: true,
            onClose: close,
            variant: detached ? 'detachedModal' : 'modal',
            sx: combineStyles('inner$modal'),
            ref: forwardedRef,
          })
        }
      </Drawer>

      <CSSTransition
        nodeRef={transitionNodeRef}
        in={standardNavigationDrawerOpened}
        timeout={150} // motionTokens.duration$short3
        unmountOnExit
      >
        {(status) => (
          <FloatingTransition
            status={status}
            placement={anchor}
            origin="edge"
            pattern="enterExitOffScreen"
            sx={combineStyles('transitionContainer')}
            ref={transitionNodeHandleRef}
          >
            {renderContent({
              onClose: appLayoutContext.navigationDrawer?.state?.close,
              variant: 'standard',
              ref: transitionNodeHandleRef,
            })}
          </FloatingTransition>
        )}
      </CSSTransition>
    </>
  );
});
