import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { IAppLayoutNavigationRailThemeFactory } from './AppLayoutNavigationRail.css';
import type { IAppLayoutNavigationRailFactory } from './AppLayoutNavigationRail.types';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Motion } from '../Motion';
import { NavigationRail } from '../NavigationRail';
import { appLayoutNavigationRailTheme } from './AppLayoutNavigationRail.css';

const COMPONENT_NAME = 'AppLayoutNavigationRail';

export const AppLayoutNavigationRail =
  componentFactory<IAppLayoutNavigationRailFactory>((props, forwardedRef) => {
    const { classNames, className, styles, style, variant, opened, ...other } =
      useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const { getStyles } =
      useComponentTheme<IAppLayoutNavigationRailThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: appLayoutNavigationRailTheme,
      });

    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs(
      transitionNodeRef,
      forwardedRef,
    );

    const hasNavigationRail =
      appLayoutContext?.components.includes('navigationRail') ?? true;
    if (!hasNavigationRail) {
      return null;
    }

    const navigationRailOpened =
      opened ?? appLayoutContext?.navigationMode === 'rail';

    const side = 'left';

    return (
      <CSSTransition
        nodeRef={transitionNodeRef}
        in={navigationRailOpened}
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
            <NavigationRail {...getStyles('root')} {...other} />
          </Motion>
        )}
      </CSSTransition>
    );
  });

AppLayoutNavigationRail.theme = appLayoutNavigationRailTheme;
AppLayoutNavigationRail.displayName = `@sixui/${COMPONENT_NAME}`;
AppLayoutNavigationRail.Destination = NavigationRail.Destination;
