import { useRef } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { CSSTransition } from 'react-transition-group';

import type { ISnackbarThemeFactory } from './Snackbar.css';
import type { ISnackbarFactory } from './Snackbar.types';
import { Motion } from '~/components/Motion';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { useTimeout } from '~/hooks/useTimeout';
import { componentFactory } from '~/utils/component/componentFactory';
import { px } from '~/utils/css';
import { useOverlaysContext } from '../Overlays/Overlays.context';
import { COMPONENT_NAME } from './Snackbar.constants';
import { SnackbarContent } from './SnackbarContent';
import { snackbarTheme } from './Snackbar.css';

export const Snackbar = componentFactory<ISnackbarFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened,
      justify = 'center',
      autoHideDuration,
      onClose,
      onClosed,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISnackbarThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: snackbarTheme,
      modifiers: {
        justify,
      },
    });

    const overlaysContext = useOverlaysContext();
    const snackbarOverlayInstances = Object.values(
      overlaysContext.instances,
    ).filter((instance) => instance.overlayId === COMPONENT_NAME);
    console.log('___', snackbarOverlayInstances);

    const x = useRef(
      24 + (48 + 24) * Math.max(snackbarOverlayInstances.length - 1, 0),
    );
    console.log('_____X', x.current);

    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs(
      transitionNodeRef,
      forwardedRef,
    );

    useTimeout(() => onClose?.(), opened ? (autoHideDuration ?? null) : null);

    return (
      <CSSTransition
        nodeRef={transitionNodeRef}
        in={opened}
        timeout={550} // motionTokens.duration$long3
        onExited={onClosed}
        unmountOnExit
      >
        {(status) => (
          <Motion
            {...getStyles('root', {
              style: assignInlineVars({
                [snackbarTheme.tokens.fixedBottomSpace]: px(x.current),
              }),
            })}
            orientation="vertical"
            origin="edge"
            placement={{ side: 'top' }}
            pattern={{ enter: 'enterExit', exit: 'fade' }}
            status={status}
            z="$overlay"
            ref={transitionNodeRef}
          >
            <SnackbarContent
              {...getStyles('snackbarContent')}
              ref={transitionNodeHandleRef}
              onClose={onClose}
              {...other}
            />
          </Motion>
        )}
      </CSSTransition>
    );
  },
);

Snackbar.theme = snackbarTheme;
Snackbar.displayName = `@sixui/core/${COMPONENT_NAME}`;
