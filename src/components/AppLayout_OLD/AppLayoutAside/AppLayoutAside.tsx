import { forwardRef, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { CSSTransition } from 'react-transition-group';

import type { ISideSheetContentStylesKey } from '~/components/SideSheetContent';
import type { IAppLayoutAsideStylesKey } from './AppLayoutAside.styles';
import type { IAppLayoutAsideProps } from './AppLayoutAside.types';
import { Drawer } from '~/components/Drawer';
import { FloatingTransition } from '~/components/FloatingTransition';
import { SideSheetContent } from '~/components/SideSheetContent';
import { useStyles } from '~/hooks/useStyles';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutAsideStyles } from './AppLayoutAside.styles';

export const AppLayoutAside = forwardRef<HTMLDivElement, IAppLayoutAsideProps>(
  function AppLayoutAside(props, forwardedRef) {
    const { styles, sx, detached, ...other } = props;
    const appLayoutContext = useAppLayoutContext();

    const { combineStyles, globalStyles } = useStyles<
      ISideSheetContentStylesKey | IAppLayoutAsideStylesKey
    >({
      componentName: 'AppLayoutAside',
      styles: [appLayoutAsideStyles, styles],
    });

    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs([
      transitionNodeRef,
      forwardedRef,
    ]);

    const hasAside = appLayoutContext.components.includes('aside');
    if (!hasAside) {
      return null;
    }

    const standardAsideOpened = appLayoutContext.aside?.state?.standardOpened;
    const modalAsideOpened = appLayoutContext.aside?.state?.modalOpened;

    const anchor = 'right';

    const renderContent = (
      props?: Partial<React.ComponentPropsWithRef<typeof SideSheetContent>>,
    ): React.JSX.Element => (
      <SideSheetContent
        side={anchor}
        {...other}
        {...props}
        sx={[globalStyles, combineStyles('inner'), props?.sx, sx]}
      />
    );

    return (
      <>
        <Drawer
          root={appLayoutContext.root}
          opened={modalAsideOpened}
          onClose={appLayoutContext.aside?.state?.close}
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
          in={standardAsideOpened}
          timeout={550} // motionTokens.duration$long3
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
                onClose: appLayoutContext.aside?.state?.close,
                variant: 'standard',
                ref: transitionNodeHandleRef,
              })}
            </FloatingTransition>
          )}
        </CSSTransition>
      </>
    );
  },
);
