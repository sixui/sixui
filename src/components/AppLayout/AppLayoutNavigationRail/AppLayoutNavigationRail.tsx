import { forwardRef, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { CSSTransition } from 'react-transition-group';

import type { IAppLayoutNavigationRailProps } from './AppLayoutNavigationRail.types';
import { useStyles } from '~/hooks/useStyles';
import { useAppLayoutContext } from '../AppLayout.context';
import {
  appLayoutNavigationRailStyles,
  type IAppLayoutNavigationRailStylesKey,
} from './AppLayoutNavigationRail.styles';
import {
  NavigationRail,
  type INavigationRailStylesKey,
} from '~/components/NavigationRail';
import {
  FloatingTransition,
  IFloatingTransitionStatus,
} from '~/components/FloatingTransition';
import { useMergeRefs } from '@floating-ui/react';

export const AppLayoutNavigationRail = forwardRef<
  HTMLDivElement,
  IAppLayoutNavigationRailProps
>(function AppLayoutNavigationRail(props, forwardedRef) {
  const { styles, sx, ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  const { combineStyles, getStyles, globalStyles } = useStyles<
    INavigationRailStylesKey | IAppLayoutNavigationRailStylesKey
  >({
    name: 'AppLayoutNavigationRail',
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

  // const hasHeader = appLayoutContext.components.includes('header');
  // const hasHeaderOpened = hasHeader;

  const navigationRailOpened =
    appLayoutContext.canonicalLayout.navigationMode === 'rail';

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
          placement='left'
          origin='edge'
          pattern='enterExitOffScreen'
          sx={combineStyles('host')}
          ref={transitionNodeHandleRef}
        >
          <NavigationRail
            {...other}
            sx={[globalStyles, combineStyles('inner'), sx]}
          />
        </FloatingTransition>
      )}
    </CSSTransition>
  );
});
