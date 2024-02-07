import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IBadgeStyleKey } from '@/components/atoms/Badge';
import { componentVars as vars } from './Badge.stylex';
import { motionVars } from '../vars/motion.stylex';

type IBadgeStyles = IStyles<IBadgeStyleKey>;
export const styles: MapNamespaces<IBadgeStyles> = stylex.create<IBadgeStyles>({
  host: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderRadius: vars.containerShape,
    minWidth: vars.containerMinWidth,
    height: vars.containerHeight,
    padding: vars.containerPadding,
    transitionProperty: 'transform',
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasized,
  },
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    backgroundColor: vars.containerColor,
  },
  background$disabled: {
    backgroundColor: vars.containerColor$disabled,
    opacity: vars.containerOpacity$disabled,
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
  label: {
    position: 'relative',
    fontFamily: vars.labelTextFont,
    lineHeight: vars.labelTextLineHeight,
    fontSize: vars.labelTextSize,
    letterSpacing: vars.labelTextLetterSpacing,
    fontWeight: vars.labelTextWeight,
    color: vars.labelTextColor,
  },
  label$disabled: {
    color: vars.labelTextColor$disabled,
    opacity: vars.labelTextOpacity$disabled,
  },
});
