import { useRef } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { CSSTransition } from 'react-transition-group';

import type { ISnackbarThemeFactory } from './Snackbar.css';
import type { ISnackbarFactory } from './Snackbar.types';
import { Box } from '~/components/Box';
import { Motion } from '~/components/Motion';
import { useOverlayContext } from '~/components/Overlays/Overlay.context';
import { useOverlaysStateContext } from '~/components/Overlays/OverlaysState.context';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { useTimeout } from '~/hooks/useTimeout';
import { componentFactory } from '~/utils/component/componentFactory';
import {
  COMPONENT_NAME,
  DEFAULT_AUTO_HIDE_DURATION_MS,
  OVERLAY_LAYER,
} from './Snackbar.constants';
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
      autoHideDuration: autoHideDurationProp,
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
        opened,
      },
    });

    const overlaysStateContext = useOverlaysStateContext();
    const overlayContext = useOverlayContext();
    const lastOpenOverlayInstancePosition = useRef(0);
    const overlayInstancePosition = overlayContext?.instanceId
      ? overlaysStateContext.getInstancePosition(
          overlayContext.instanceId,
          OVERLAY_LAYER,
        )
      : 0;
    if (opened) {
      lastOpenOverlayInstancePosition.current = overlayInstancePosition;
    }
    const autoHideDuration =
      autoHideDurationProp ??
      ((other.actionLabel ?? other.showCloseButton)
        ? undefined
        : DEFAULT_AUTO_HIDE_DURATION_MS);

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
          <Box
            {...getStyles('root', {
              style: assignInlineVars({
                [snackbarTheme.tokens.position]: String(
                  lastOpenOverlayInstancePosition.current,
                ),
              }),
            })}
          >
            <Motion
              {...getStyles('motion')}
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
          </Box>
        )}
      </CSSTransition>
    );
  },
);

Snackbar.theme = snackbarTheme;
Snackbar.displayName = `@sixui/core/${COMPONENT_NAME}`;
