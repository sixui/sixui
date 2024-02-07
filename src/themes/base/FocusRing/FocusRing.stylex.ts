import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IFocusRingStyleVarKey } from '@/components/utils/FocusRing';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { motionVars } from '../vars/motion.stylex';
import { shapeVars } from '../vars/shape.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-focus-ring.scss
const vars: IStyleVars<IFocusRingStyleVarKey> = {
  activeWidth: '8px',
  color: colorRolesVars.secondary,
  duration: motionVars.duration$long4,
  inwardOffset: '0px',
  outwardOffset: '2px',
  shape: shapeVars.corner$none,
  width: '3px',
};

export const componentVars = stylex.defineVars(vars);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
