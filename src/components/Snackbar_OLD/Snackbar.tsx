import { forwardRef, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { CSSTransition } from 'react-transition-group';

import type { ISnackbarProps } from './Snackbar.types';
import { useStyles } from '~/hooks/useStyles';
import { useTimeout } from '~/hooks/useTimeout';
import { Base } from '../Base';
import { SnackbarContent } from '../SnackbarContent';
import { snackbarStyles } from './Snackbar.styles';
import { snackbarTheme } from './Snackbar.stylex';

export const Snackbar = forwardRef<HTMLDivElement, ISnackbarProps>(
  function Snackbar(props, forwardedRef) {
    const {
      styles,
      sx,
      open,
      horizontalOrigin = 'center',
      autoHideDuration,
      onClose,
      ...other
    } = props;

    const { combineStyles, getStyles, globalStyles } = useStyles({
      componentName: 'Snackbar',
      styles: [snackbarStyles, styles],
    });

    useTimeout(() => onClose?.(), open ? (autoHideDuration ?? null) : null);

    const nodeRef = useRef<HTMLDivElement>(null);
    const handleRef = useMergeRefs([nodeRef, forwardedRef]);

    return (
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={550} // motionTokens.duration$long3
        classNames={{
          enter: getStyles('animation$enter').className,
          enterActive: getStyles('animation$enterActive').className,
          exitActive: getStyles('animation$exitActive').className,
        }}
        unmountOnExit
      >
        <Base
          sx={[
            snackbarTheme,
            globalStyles,
            combineStyles(
              'host',
              horizontalOrigin === 'left'
                ? 'host$left'
                : horizontalOrigin === 'center'
                  ? 'host$center'
                  : undefined,
            ),
            sx,
          ]}
        >
          <SnackbarContent
            sx={combineStyles('snackbarContent')}
            {...other}
            ref={handleRef}
            onClose={onClose}
          />
        </Base>
      </CSSTransition>
    );
  },
);
