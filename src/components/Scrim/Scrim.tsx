import { forwardRef, useMemo } from 'react';
import { FloatingOverlay, useTransitionStatus } from '@floating-ui/react';

import type { IScrimProps } from './Scrim.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { scrimStyles } from './Scrim.styles';
import { scrimTheme } from './Scrim.stylex';

export const Scrim = forwardRef<HTMLDivElement, IScrimProps>(
  function Scrim(props, forwardedRef) {
    const {
      floatingContext,
      styles,
      sx,
      contained,
      variant = 'darken',
      children,
      ...other
    } = props;

    const componentTheme = useComponentTheme('Scrim');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(scrimStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const transitionStatus = useTransitionStatus(floatingContext, {
      duration: 150, // motionTokens.duration$short3
    });

    if (!transitionStatus.isMounted) {
      return null;
    }

    return (
      <FloatingOverlay
        {...other}
        {...sxf(
          scrimTheme,
          componentTheme.overridenStyles,
          'host',
          `host$${variant}`,
          `transition$${transitionStatus.status}`,
          sx,
        )}
        ref={forwardedRef}
        style={contained ? { position: 'absolute' } : undefined}
      >
        {children}
      </FloatingOverlay>
    );
  },
);
