import { forwardRef } from 'react';
import { FloatingOverlay, useTransitionStatus } from '@floating-ui/react';

import type { IScrimProps } from './Scrim.types';
import { useStyles } from '~/hooks/useStyles';
import { scrimStyles } from './Scrim.styles';
import { scrimTheme } from './Scrim.stylex';

export const Scrim = forwardRef<HTMLDivElement, IScrimProps>(
  function Scrim(props, forwardedRef) {
    const {
      floatingContext,
      styles,
      sx,
      variant = 'darken',
      children,
      ...other
    } = props;

    const { getStyles, globalStyles } = useStyles({
      name: 'Scrim',
      styles: [scrimStyles, styles],
    });

    const transitionStatus = useTransitionStatus(floatingContext, {
      duration: 150, // motionTokens.duration$short3
    });

    if (!transitionStatus.isMounted) {
      return null;
    }

    return (
      <FloatingOverlay
        {...other}
        {...getStyles(
          scrimTheme,
          globalStyles,
          'host',
          `host$${variant}`,
          `transition$${transitionStatus.status}`,
          sx,
        )}
        ref={forwardedRef}
      >
        {children}
      </FloatingOverlay>
    );
  },
);
