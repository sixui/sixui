import stylex from '@stylexjs/stylex';

import type { IMotionThemeVars } from '@/themes/motion.types';

// https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-motion.scss

export const motionVars = stylex.defineVars<IMotionThemeVars>({
  duration$extraLong1: '700ms',
  duration$extraLong2: '800ms',
  duration$extraLong3: '900ms',
  duration$extraLong4: '1000ms',
  duration$long1: '450ms',
  duration$long2: '500ms',
  duration$long3: '550ms',
  duration$long4: '600ms',
  duration$medium1: '250ms',
  duration$medium2: '300ms',
  duration$medium3: '350ms',
  duration$medium4: '400ms',
  duration$short1: '50ms',
  duration$short2: '100ms',
  duration$short3: '150ms',
  duration$short4: '200ms',
  easing$emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  easing$emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  easing$emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  easing$linear: 'cubic-bezier(0, 0, 1, 1)',
  easing$standard: 'cubic-bezier(0.2, 0, 0, 1)',
  easing$standardAccelerate: 'cubic-bezier(0.3, 0, 1, 1)',
  easing$standardDecelerate: 'cubic-bezier(0, 0, 0, 1)',
});
