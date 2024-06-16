import { forwardRef, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { IContainerProps } from '@/helpers/types';
import type {
  IScrimStyleKey,
  IScrimStyleVarKey,
  IScrimVariant,
} from './Scrim.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useHideBodyScroll } from '@/hooks/useHideBodyScroll';
import { useForkRef } from '@/hooks/useForkRef';

export type IScrimProps = IContainerProps<IScrimStyleKey> & {
  open?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  children: React.ReactNode;
  onMouseDown?: (event: React.MouseEvent) => void;
  contained?: boolean;
  variant?: IScrimVariant;
};

export const Scrim = forwardRef<HTMLDivElement, IScrimProps>(
  function Scrim(props, ref) {
    const {
      styles,
      sx,
      open,
      onClick,
      children,
      onMouseDown,
      contained,
      variant = 'darken',
    } = props;

    const { theme } = useComponentTheme('Scrim');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IScrimStyleKey, IScrimStyleVarKey>(stylesCombinator),
      [stylesCombinator],
    );
    useHideBodyScroll({
      disabled: !open,
    });

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
      >
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */}
        <div
          {...sxf(
            'host',
            `host$${variant}`,
            contained && 'host$contained',
            !open && 'host$close',
            sx,
          )}
          aria-hidden
          ref={handleRef}
          onClick={onClick}
          role='button'
          onMouseDown={onMouseDown}
        >
          {children}
        </div>
      </CSSTransition>
    );
  },
);
