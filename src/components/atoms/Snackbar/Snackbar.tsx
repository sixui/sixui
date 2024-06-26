import { forwardRef, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useTimeout } from 'usehooks-ts';

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
import { useForkRef } from '@/hooks/useForkRef';

export type ISnackbarProps = IContainerProps<ISnackbarStyleKey> &
  IOmit<ISnackbarContentProps, 'styles' | 'sx' | 'onClose'> & {
    open?: boolean;
    onClose?: () => void;
    horizontalOrigin?: 'left' | 'center';
    autoHideDuration?: number;
  };

export const Snackbar = forwardRef<HTMLDivElement, ISnackbarProps>(
  function Snackbar(props, ref) {
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
    const handleRef = useForkRef(nodeRef, ref);

    return (
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={1000}
        classNames={{
          enter: sxf('animation$onEnter').className,
          enterActive: sxf('animation$onEnterActive').className,
          exitActive: sxf('animation$onExitActive').className,
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
