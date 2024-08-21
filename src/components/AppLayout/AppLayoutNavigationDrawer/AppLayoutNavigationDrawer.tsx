import { forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMergeRefs } from '@floating-ui/react';

import type { IAppLayoutNavigationDrawerProps } from './AppLayoutNavigationDrawer.types';
import { useStyles } from '~/hooks/useStyles';
import { FloatingTransition } from '~/components/FloatingTransition';
import { NavigationDrawerContent } from '~/components/NavigationDrawerContent';
import {
  SideSheetContent,
  type ISideSheetContentStylesKey,
} from '~/components/SideSheetContent';
import { Drawer } from '~/components/Drawer';
import { useAppLayoutContext } from '../AppLayout.context';
import {
  appLayoutNavigationDrawerStyles,
  type IAppLayoutNavigationDrawerStylesKey,
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
    appLayoutContext.navigationDrawer?.state?.standardOpened;
  const modalNavigationDrawerOpened =
    appLayoutContext.navigationDrawer?.state?.modalOpened;

  const anchor = 'left';

  const renderContent = (
    props?: Partial<React.ComponentPropsWithRef<typeof SideSheetContent>>,
  ): JSX.Element => (
    <NavigationDrawerContent
      anchor={anchor}
      {...other}
      {...props}
      sx={[globalStyles, combineStyles('inner'), props?.sx, sx]}
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
