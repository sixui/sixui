import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { motionVars } from '@/themes/base/vars/motion.stylex';

const color1 = `color-mix(in srgb, ${colorRolesVars.shadow} 30%, transparent)`;
const color2 = `color-mix(in srgb, ${colorRolesVars.shadow} 15%, transparent)`;

const vars = {
  transitionDuration: motionVars.duration$medium2,
  transitionTimingFunction: motionVars.easing$emphasized,
  boxShadow: undefined,
  boxShadow$level0: 'none',
  boxShadow$level1: `0 1px 2px 0 ${color1}, 0 1px 3px 1px ${color2}`,
  boxShadow$level2: `0 1px 2px 0 ${color1}, 0 2px 6px 2px ${color2}`,
  boxShadow$level3: `0 1px 3px 0 ${color1}, 0 4px 8px 3px ${color2}`,
  boxShadow$level4: `0 2px 3px 0 ${color1}, 0 6px 10px 4px ${color2}`,
  boxShadow$level5: `0 4px 4px 0 ${color1}, 0 8px 12px 6px ${color2}`,
};

export const elevationTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const elevationTheme = stylex.createTheme(elevationTokens, vars);
