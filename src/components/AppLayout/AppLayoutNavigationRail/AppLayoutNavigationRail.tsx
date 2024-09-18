import { forwardRef, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { CSSTransition } from 'react-transition-group';

import type { INavigationRailStylesKey } from '~/components/NavigationRail';
import type { IAppLayoutNavigationRailStylesKey } from './AppLayoutNavigationRail.styles';
import type { IAppLayoutNavigationRailProps } from './AppLayoutNavigationRail.types';
import { FloatingTransition } from '~/components/FloatingTransition';
import { NavigationRail } from '~/components/NavigationRail';
import { useStyles } from '~/hooks/useStyles';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutNavigationRailStyles } from './AppLayoutNavigationRail.styles';

export const AppLayoutNavigationRail = forwardRef<
  HTMLDivElement,
  IAppLayoutNavigationRailProps
>(function AppLayoutNavigationRail(props, forwardedRef) {
  const { styles, sx, ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  const { combineStyles, globalStyles } = useStyles<
    INavigationRailStylesKey | IAppLayoutNavigationRailStylesKey
  >({
    componentName: 'AppLayoutNavigationRail',
    styles: [appLayoutNavigationRailStyles, styles],
  });

  const transitionNodeRef = useRef<HTMLDivElement>(null);
  const transitionNodeHandleRef = useMergeRefs([
    transitionNodeRef,
    forwardedRef,
  ]);

  const hasNavigationRail =
    appLayoutContext.components.includes('navigationRail');
  if (!hasNavigationRail) {
    return null;
  }

  const navigationRailOpened = appLayoutContext.navigationMode === 'rail';

  return (
    <CSSTransition
      nodeRef={transitionNodeRef}
      in={navigationRailOpened}
      timeout={550} // motionTokens.duration$long3
      unmountOnExit
    >
      {(status) => (
        <FloatingTransition
          status={status}
          placement="left"
          origin="edge"
          pattern="enterExitOffScreen"
          sx={combineStyles('host')}
          ref={transitionNodeHandleRef}
        >
          <NavigationRail
            {...other}
            sx={[globalStyles, combineStyles('navigationRail'), sx]}
          />
        </FloatingTransition>
      )}
    </CSSTransition>
  );
});
