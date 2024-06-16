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
      // FIXME: size
      // maxWidth: `calc(100% - ${vars.fixedHorizontalSpace} * 2)`,
      transformOrigin: 'bottom',
    },
    host$left: {
      position: 'fixed',
      left: vars.fixedHorizontalSpace,
      bottom: vars.fixedBottomSpace,
    },
    host$center: {
      position: 'fixed',
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      bottom: vars.fixedBottomSpace,
    },
    onEnter: {
      opacity: 0,
      transform: 'scaleY(0)',
    },
    onEnterActive: {
      opacity: 1,
      transform: 'scaleY(1)',
      transitionProperty: 'transform, opacity',
      transitionDuration: motionVars.duration$long2,
      transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
    },
    onExitActive: {
      opacity: 0,
      transitionProperty: 'opacity',
      transitionDuration: motionVars.duration$short4,
      transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
    },
  });
