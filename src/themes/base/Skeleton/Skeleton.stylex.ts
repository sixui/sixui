import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ISkeletonStyleVarKey } from '@/components/atoms/Skeleton';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';

const vars: Partial<IStyleVars<ISkeletonStyleVarKey>> = {
  zIndex: '9',

  // container
  containerShape: `min(0.25em, ${shapeVars.corner$xs})`,
  containerColor: colorRolesVars.surfaceContainerHigh,

  // animation
  animationTargetColor: colorRolesVars.inverseSurface,
  // &:pulse
  animationMaxOpacity$pulse: '0.12',
  animationDuration$pulse: '2s',
  animationDelay$pulse: '0.5s',
  // &:wave
  animationMaxOpacity$wave: '0.08',
  animationDuration$wave: '2s',
  animationDelay$wave: '0.5s',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<ISkeletonStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
