import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { ISnackbarThemeFactory } from './Snackbar.css';
import type { ISnackbarFactory } from './Snackbar.types';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { useTimeout } from '~/hooks/useTimeout';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Motion } from '../Motion';
import { SnackbarContent } from '../SnackbarContent';
import { snackbarTheme } from './Snackbar.css';

const COMPONENT_NAME = 'Snackbar';

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
        unmountOnExit
      >
        {(status) => (
          <Motion
            {...getStyles('root')}
            orientation="vertical"
            placement={{ side: 'bottom' }}
            pattern={{ enter: 'enterExitOffScreen', exit: 'fade' }}
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
Snackbar.displayName = `@sixui/${COMPONENT_NAME}`;
