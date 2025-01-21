import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { IAppLayoutNavigationDrawerThemeFactory } from './AppLayoutNavigationDrawer.css';
import type { IAppLayoutNavigationDrawerFactory } from './AppLayoutNavigationDrawer.types';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Drawer } from '../Drawer';
import { Motion } from '../Motion';
import { NavigationDrawerContent } from '../NavigationDrawerContent';
import { NavigationDrawerSection } from '../NavigationDrawerSection';
import { appLayoutNavigationDrawerTheme } from './AppLayoutNavigationDrawer.css';

const COMPONENT_NAME = 'AppLayoutNavigationDrawer';

export const AppLayoutNavigationDrawer =
  componentFactory<IAppLayoutNavigationDrawerFactory>((props, forwardedRef) => {
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

    const { getStyles } =
      useComponentTheme<IAppLayoutNavigationDrawerThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: appLayoutNavigationDrawerTheme,
      });

    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs(
      transitionNodeRef,
      forwardedRef,
    );

    const standardNavigationDrawerOpened =
      standardOpened ??
      appLayoutContext?.navigationDrawer?.state?.standardOpened;
    const modalNavigationDrawerOpened =
      modalOpened ?? appLayoutContext?.navigationDrawer?.state?.modalOpened;

    const side = 'left';

    return (
      <>
        <Drawer
          root={appLayoutContext?.root}
          opened={modalNavigationDrawerOpened}
          onClose={appLayoutContext?.navigationDrawer?.state?.close}
          side={side}
          variant={detached ? 'detached' : undefined}
          {...getStyles('wrapper')}
        >
          {({ close }) => (
            <NavigationDrawerContent
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
          in={standardNavigationDrawerOpened}
          timeout={150} // motionTokens.duration$short3
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
              <NavigationDrawerContent
                {...getStyles('root')}
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
  });

AppLayoutNavigationDrawer.theme = appLayoutNavigationDrawerTheme;
AppLayoutNavigationDrawer.displayName = `@sixui/${COMPONENT_NAME}`;
AppLayoutNavigationDrawer.Section = NavigationDrawerSection;
