import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IRippleStyleKey } from '@/components/utils/Ripple';
import { componentVars as vars } from './Ripple.stylex';

// https://github.com/material-components/material-web/blob/main/ripple/internal/_ripple.scss

type IRippleStyles = IStyles<IRippleStyleKey>;
export const styles: MapNamespaces<IRippleStyles> =
  stylex.create<IRippleStyles>({
    host: {
      display: 'flex',
      margin: 'auto',

      borderRadius: 'inherit',
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    host$disabled: {
      display: 'none',
    },
    surface: {
      borderRadius: 'inherit',
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',

      '::before': {
        content: '',
        opacity: 0,
        position: 'absolute',
        inset: 0,

        backgroundColor: vars.color$hover,
        transitionProperty: 'opacity, background-color',
        transitionDuration: '15ms, 15ms',
        transitionTimingFunction: 'linear, linear',
      },
      '::after': {
        content: '',
        opacity: 0,
        position: 'absolute',

        // press ripple fade-out
        backgroundImage: `radial-gradient(closest-side, ${vars.color$pressed} max(calc(100% - 70px), 65%), transparent 100%)`,
        transformOrigin: 'center center',
        transitionProperty: 'opacity',
        transitionDuration: '375ms',
        transitionTimingFunction: 'linear',
      },
    },
    surface$hover: {
      '::before': {
        opacity: vars.opacity$hover,
      },
    },
    surface$pressed: {
      '::after': {
        // press ripple fade-in
        opacity: vars.opacity$pressed,
        transitionDuration: '105ms',
      },
    },
    surface$pressedStatic: {
      '::before': {
        backgroundColor: vars.color$hover,
        opacity: vars.opacity$hover,
      },

      '::after': {
        inset: 0,
        backgroundColor: vars.color$pressed,
        opacity: vars.opacity$pressed,
      },
    },
    surface$dragged: {
      '::before': {
        backgroundColor: vars.color$dragged,
        opacity: vars.opacity$dragged,
      },

      '::after': {
        display: 'none',
      },
    },
  });
