import { forwardRef, useMemo } from 'react';
import { FloatingOverlay, useTransitionStatus } from '@floating-ui/react';

import type { IScrimStyleKey, IScrimStyleVarKey } from './Scrim.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';
import { IScrimProps } from './ScrimProps';

export const Scrim = forwardRef<HTMLDivElement, IScrimProps>(
  function Scrim(props, forwardedRef) {
    const {
      context,
      styles,
      sx,
      contained,
      variant = 'darken',
      children,
      ...other
    } = props;

    const { theme } = useComponentThemeOld('Scrim');
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
        style={contained ? { position: 'absolute' } : undefined}
      >
        {children}
      </FloatingOverlay>
    );
  },
);
