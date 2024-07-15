import stylex from '@stylexjs/stylex';

import { optionCardTokens as vars } from './OptionCard.stylex';
import { cardTokens } from '@/components/atoms/Card/Card.stylex';
import { motionVars } from '@/themes/base/vars/motion.stylex';

export type IOptionCardStylesKey = keyof typeof optionCardStyles;
export const optionCardStyles = stylex.create({
  host: {
    [cardTokens.containerColor]: vars.containerColor,
  },
  host$selected: {
    [cardTokens.outlineColor]: vars.selectedOutlineColor,
    [cardTokens.outlineWidth]: vars.selectedOutlineWidth,
    [cardTokens.outlineColor$disabled]: vars.selectedOutlineColor$disabled,
    [cardTokens.outlineOpacity$disabled]: vars.selectedOutlineOpacity$disabled,
    [cardTokens.outlineColor$focus]: vars.selectedOutlineColor$focus,
    [cardTokens.outlineColor$hover]: vars.selectedOutlineColor$hover,
    [cardTokens.outlineColor$pressed]: vars.selectedOutlineColor$pressed,
    [cardTokens.outlineColor$dragged]: vars.selectedOutlineColor$dragged,
  },
  text: {
    fontFamily: vars.textFont,
    lineHeight: vars.textLineHeight,
    fontSize: vars.textSize,
    letterSpacing: vars.textLetterSpacing,
    fontWeight: vars.textWeight,
    color: vars.textColor,
  },
  text$disabled: {
    color: vars.textColor$disabled,
    opacity: vars.textOpacity$disabled,
  },
});

export const optionCardCardStyles = stylex.create({
  outline: {
    transitionProperty: 'border-color',
    transitionDuration: motionVars.duration$long3,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
  },
});
