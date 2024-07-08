import { forwardRef, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useTimeout } from 'usehooks-ts';
import { useMergeRefs } from '@floating-ui/react';

import type { IContainerProps, IOmit } from '@/helpers/types';
import type {
  ISnackbarStyleKey,
  ISnackbarStyleVarKey,
} from './Snackbar.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  SnackbarContent,
  type ISnackbarContentProps,
} from '@/components/atoms/SnackbarContent';

export type ISnackbarProps = IContainerProps<ISnackbarStyleKey> &
  IOmit<ISnackbarContentProps, 'styles' | 'sx' | 'onClose'> & {
    open?: boolean;
    onClose?: () => void;
    horizontalOrigin?: 'left' | 'center';
    autoHideDuration?: number;
  };

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

    const { theme } = useComponentTheme('Snackbar');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<ISnackbarStyleKey, ISnackbarStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    useTimeout(() => onClose?.(), open ? autoHideDuration ?? null : null);

    const nodeRef = useRef<HTMLDivElement>(null);
    const handleRef = useMergeRefs([nodeRef, forwardedRef]);

    return (
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={550} // motionVars.duration$long3
        classNames={{
          enter: sxf('animation$enter').className,
          enterActive: sxf('animation$enterActive').className,
          exitActive: sxf('animation$exitActive').className,
        }}
        unmountOnExit
      >
        <div
          {...sxf(
            'host',
            horizontalOrigin === 'left'
              ? 'host$left'
              : horizontalOrigin === 'center'
                ? 'host$center'
                : undefined,
            theme.vars,
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
