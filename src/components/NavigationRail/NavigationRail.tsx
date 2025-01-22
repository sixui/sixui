import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { INavigationRailThemeFactory } from './NavigationRail.css';
import type { INavigationRailFactory } from './NavigationRail.types';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Motion } from '../Motion';
import { NavigationRailContent } from '../NavigationRailContent';
import { navigationRailTheme } from './NavigationRail.css';

const COMPONENT_NAME = 'NavigationRail';

export const NavigationRail = componentFactory<INavigationRailFactory>(
  (props, forwardedRef) => {
    const { classNames, className, styles, style, variant, opened, ...other } =
      useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const { getStyles } = useComponentTheme<INavigationRailThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: navigationRailTheme,
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
            <NavigationRailContent {...getStyles('root')} {...other} />
          </Motion>
        )}
      </CSSTransition>
    );
  },
);

NavigationRail.theme = navigationRailTheme;
NavigationRail.displayName = `@sixui/${COMPONENT_NAME}`;
NavigationRail.Destination = NavigationRailContent.Destination;
