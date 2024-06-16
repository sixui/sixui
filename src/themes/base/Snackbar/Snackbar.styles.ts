import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ISnackbarStyleKey } from '@/components/atoms/Snackbar';
import { componentVars as vars } from './Snackbar.stylex';
import { motionVars } from '../vars/motion.stylex';

type ISnackbarStyles = IStyles<ISnackbarStyleKey>;
export const styles: MapNamespaces<ISnackbarStyles> =
  stylex.create<ISnackbarStyles>({
    host: {
      display: 'flex',
      position: 'fixed',
      bottom: vars.fixedBottomSpace,
      zIndex: 499,
      width: `calc(100% - ${vars.fixedHorizontalSpace} * 2)`,
    },
    host$left: {
      left: vars.fixedHorizontalSpace,
      justifyContent: 'start',
    },
    host$center: {
      left: '50%',
      right: 'auto',
      transform: 'translateX(-50%)',
      justifyContent: 'center',
    },
    snackbarContent: {
      transformOrigin: 'bottom',
    },
    animation$onEnter: {
      opacity: 0,
      transform: 'scaleY(0)',
    },
    animation$onEnterActive: {
      opacity: 1,
      transform: 'scaleY(1)',
      transitionProperty: 'transform, opacity',
      transitionDuration: motionVars.duration$long2,
      transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
    },
    animation$onExitActive: {
      opacity: 0,
      transitionProperty: 'opacity',
      transitionDuration: motionVars.duration$short4,
      transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
    },
  });
