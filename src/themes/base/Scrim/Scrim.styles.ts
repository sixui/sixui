import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IScrimStyleKey } from '@/components/atoms/Scrim';
import { componentVars as vars } from './Scrim.stylex';
import { motionVars } from '../vars/motion.stylex';

type IScrimStyles = IStyles<IScrimStyleKey>;
export const styles: MapNamespaces<IScrimStyles> = stylex.create<IScrimStyles>({
  host: {
    display: 'grid',
    placeItems: 'center',
    zIndex: 500,
  },
  host$darken: {
    backgroundColor: vars.containerColor$darken,
  },
  host$lighten: {
    backgroundColor: vars.containerColor$lighten,
  },
  transition$unmounted: {},
  transition$initial: {
    opacity: 0,
  },
  transition$open: {
    opacity: 1,
    transitionProperty: 'opacity',
    transitionDuration: motionVars.duration$long3,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
  },
  transition$close: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
  },
});
