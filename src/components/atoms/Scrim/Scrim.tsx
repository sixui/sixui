import { forwardRef, useMemo } from 'react';
import {
  FloatingContext,
  FloatingOverlay,
  useTransitionStatus,
  type FloatingOverlayProps,
} from '@floating-ui/react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IScrimStyleKey,
  IScrimStyleVarKey,
  IScrimVariant,
} from './Scrim.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IScrimProps = IContainerProps<IScrimStyleKey> &
  FloatingOverlayProps & {
    context: FloatingContext;
    open?: boolean;
    contained?: boolean;
    variant?: IScrimVariant;
    children?: React.ReactNode;
  };

export const Scrim = forwardRef<HTMLDivElement, IScrimProps>(
  function Scrim(props, forwardedRef) {
    const {
      context,
      styles,
      sx,
      open,
      contained,
      variant = 'darken',
      children,
      ...other
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

    const transitionStatus = useTransitionStatus(context, {
      duration: 150, // motionVars.duration$short3
    });

    if (!transitionStatus.isMounted) {
      return null;
    }

    return (
      <FloatingOverlay
        {...sxf(
          'host',
          `host$${variant}`,
          `transition$${transitionStatus.status}`,
          sx,
        )}
        ref={forwardedRef}
        {...other}
        style={contained ? {position: 'absolute'} : undefined}
      >
        {children}
      </FloatingOverlay>
    );
  },
);
