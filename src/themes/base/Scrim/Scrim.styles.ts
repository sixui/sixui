import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IScrimStyleKey } from '@/components/atoms/Scrim';
import { componentVars as vars } from './Scrim.stylex';
import { motionVars } from '../vars/motion.stylex';

type IScrimStyles = IStyles<IScrimStyleKey>;
export const styles: MapNamespaces<IScrimStyles> = stylex.create<IScrimStyles>({
  host: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    inset: 0,
    WebkitTapHighlightColor: 'transparent',
    zIndex: 500,
    opacity: 0,
    visibility: 'hidden',
  },
  host$close: {
    pointerEvents: 'none',
  },
  host$darken: {
    backgroundColor: vars.containerColor$darken,
  },
  host$lighten: {
    backgroundColor: vars.containerColor$lighten,
  },
  host$contained: {
    position: 'absolute',
  },
  animation$onEnter: {
    opacity: 0,
    visibility: 'visible',
  },
  animation$onEnterActive: {
    opacity: 1,
    transitionProperty: 'opacity',
    transitionDuration: motionVars.duration$long2,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
    visibility: 'visible',
  },
  animation$onExitActive: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: motionVars.duration$short4,
    transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
  },
});
