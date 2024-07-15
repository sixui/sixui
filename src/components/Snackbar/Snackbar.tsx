import { forwardRef, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useTimeout } from 'usehooks-ts';
import { useMergeRefs } from '@floating-ui/react';

import type { ISnackbarProps } from './Snackbar.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { SnackbarContent } from '@/components/SnackbarContent';
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

    const { overridenStyles } = useComponentTheme('Snackbar');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(snackbarStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    useTimeout(() => onClose?.(), open ? autoHideDuration ?? null : null);

    const nodeRef = useRef<HTMLDivElement>(null);
    const handleRef = useMergeRefs([nodeRef, forwardedRef]);

    return (
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={550} // motionTokens.duration$long3
        classNames={{
          enter: sxf('animation$enter').className,
          enterActive: sxf('animation$enterActive').className,
          exitActive: sxf('animation$exitActive').className,
        }}
        unmountOnExit
      >
        <div
          {...sxf(
            snackbarTheme,
            overridenStyles,
            'host',
            horizontalOrigin === 'left'
              ? 'host$left'
              : horizontalOrigin === 'center'
                ? 'host$center'
                : undefined,
            sx,
          )}
        >
          <SnackbarContent
            ref={handleRef}
            sx={[stylesCombinator('snackbarContent')]}
            {...other}
            onClose={onClose}
          />
        </div>
      </CSSTransition>
    );
  },
);
