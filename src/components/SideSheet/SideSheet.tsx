import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { ISideSheetThemeFactory } from './SideSheet.css';
import type { ISideSheetFactory } from './SideSheet.types';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Drawer } from '../Drawer';
import { Motion } from '../Motion';
import { SideSheetContent } from '../SideSheetContent';
import { sideSheetTheme } from './SideSheet.css';

const COMPONENT_NAME = 'SideSheet';

export const SideSheet = componentFactory<ISideSheetFactory>(
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
      root,
      side = 'right',
      onClose,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const { getStyles } = useComponentTheme<ISideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: sideSheetTheme,
    });

    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs(
      transitionNodeRef,
      forwardedRef,
    );

    const hasSideSheet = appLayoutContext?.components.includes('aside') ?? true;
    if (!hasSideSheet) {
      return null;
    }

    const standardSideSheetOpened =
      standardOpened ?? appLayoutContext?.aside?.state?.standardOpened;
    const modalSideSheetOpened =
      modalOpened ?? appLayoutContext?.aside?.state?.modalOpened;

    return (
      <>
        <Drawer
          {...getStyles('drawer')}
          root={root ?? appLayoutContext?.root}
          opened={modalSideSheetOpened}
          onClose={() => {
            onClose?.();
            appLayoutContext?.aside?.state?.close?.();
          }}
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
          in={standardSideSheetOpened}
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

SideSheet.theme = sideSheetTheme;
SideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
