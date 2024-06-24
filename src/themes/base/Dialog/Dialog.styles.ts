import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDialogStyleKey } from '@/components/atoms/Dialog';
import { motionVars } from '../vars/motion.stylex';

// https://github.com/material-components/material-web/blob/main/dialog/internal/_dialog.scss

type IDialogStyles = IStyles<IDialogStyleKey>;
export const styles: MapNamespaces<IDialogStyles> =
  stylex.create<IDialogStyles>({
    transition$unmounted: {},
    transition$initial: {
      opacity: 0,
      transform: 'translateY(-50%)',
    },
    transition$open: {
      opacity: 1,
      transform: 'translateY(0.5)',
      transformOrigin: 'top',
      transitionProperty: 'transform',
      transitionDuration: motionVars.duration$long3,
      transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
    },
    transition$close: {
      opacity: 0,
      transform: 'translateY(-50%)',
      transformOrigin: 'top',
      transitionProperty: 'opacity, transform',
      transitionDuration: motionVars.duration$short3,
      transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
    },
  });
