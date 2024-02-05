import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IBadgeStyleKey } from '@/components/atoms/Badge';
import { componentVars as vars } from './Badge.stylex';
import { motionVars } from '../vars/motion.stylex';

type IBadgeStyles = IStyles<IBadgeStyleKey>;
export const styles: MapNamespaces<IBadgeStyles> = stylex.create<IBadgeStyles>({
  host: {
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontFamily: vars.labelTextFont,
    lineHeight: vars.labelTextLineHeight,
    fontSize: vars.labelTextSize,
    letterSpacing: vars.labelTextLetterSpacing,
    fontWeight: vars.labelTextWeight,
    borderRadius: vars.containerShape,
    minWidth: vars.containerMinWidth,
    height: vars.containerHeight,
    padding: vars.containerPadding,
    transitionProperty: 'transform',
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasized,
    backgroundColor: vars.containerColor,
    color: vars.labelTextColor,
  },
  host$dot: {
    borderRadius: vars.containerShape$dot,
    minWidth: vars.containerWidth$dot,
    height: vars.containerHeight$dot,
    padding: 0,
  },
  host$invisible: {
    transform: 'scale(0)',
  },
});
