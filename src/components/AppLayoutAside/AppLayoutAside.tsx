import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { IAppLayoutAsideThemeFactory } from './AppLayoutAside.css';
import type { IAppLayoutAsideFactory } from './AppLayoutAside.types';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Drawer } from '../Drawer';
import { Motion } from '../Motion';
import { SideSheetContent } from '../SideSheetContent';
import { appLayoutAsideTheme } from './AppLayoutAside.css';

const COMPONENT_NAME = 'AppLayoutAside';

export const AppLayoutAside = componentFactory<IAppLayoutAsideFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      detached,
      standardOpened,
      modalOpened,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const { getStyles } = useComponentTheme<IAppLayoutAsideThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutAsideTheme,
    });

    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs(
      transitionNodeRef,
      forwardedRef,
    );

    const hasAside = appLayoutContext?.components.includes('aside') ?? true;
    if (!hasAside) {
      return null;
    }

    const standardAsideOpened =
      standardOpened ?? appLayoutContext?.aside?.state?.standardOpened;
    const modalAsideOpened =
      modalOpened ?? appLayoutContext?.aside?.state?.modalOpened;

    const side = 'right';

    return (
      <>
        <Drawer
          {...getStyles('drawer')}
          root={appLayoutContext?.root}
          opened={modalAsideOpened}
          onClose={appLayoutContext?.aside?.state?.close}
          side={side}
          variant={detached ? 'detached' : undefined}
          modal
        >
          {({ close }) => (
            <SideSheetContent
              {...getStyles('root', {
                modifiers: {
                  modal: true,
                },
              })}
              side={side}
              showCloseButton
              onClose={close}
              variant={detached ? 'detachedModal' : 'modal'}
              ref={forwardedRef}
              {...other}
            />
          )}
        </Drawer>

        <CSSTransition
          nodeRef={transitionNodeRef}
          in={standardAsideOpened}
          timeout={550} // motionTokens.duration$long3
          unmountOnExit
        >
          {(status) => (
            <Motion
              status={status}
              placement={{ side }}
              origin="edge"
              pattern="enterExitOffScreen"
              {...getStyles('transitionContainer')}
              ref={transitionNodeHandleRef}
            >
              <SideSheetContent
                {...getStyles('root')}
                side={side}
                onClose={appLayoutContext?.aside?.state?.close}
                variant="standard"
                ref={transitionNodeHandleRef}
                {...other}
              />
            </Motion>
          )}
        </CSSTransition>
      </>
    );
  },
);

AppLayoutAside.theme = appLayoutAsideTheme;
AppLayoutAside.displayName = `@sixui/${COMPONENT_NAME}`;
