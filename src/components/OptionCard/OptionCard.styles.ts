import stylex from '@stylexjs/stylex';

import { optionCardTokens } from './OptionCard.stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { cardTokens } from '../Card/Card.stylex';

export type IOptionCardStylesKey = keyof typeof optionCardStyles;
export const optionCardStyles = stylex.create({
  host: {
    [cardTokens.containerColor]: optionCardTokens.containerColor,
  },
  host$selected: {
    [cardTokens.outlineColor]: optionCardTokens.selectedOutlineColor,
    [cardTokens.outlineWidth]: optionCardTokens.selectedOutlineWidth,
    [cardTokens.outlineColor$disabled]:
      optionCardTokens.selectedOutlineColor$disabled,
    [cardTokens.outlineOpacity$disabled]:
      optionCardTokens.selectedOutlineOpacity$disabled,
    [cardTokens.outlineColor$focus]:
      optionCardTokens.selectedOutlineColor$focus,
    [cardTokens.outlineColor$hover]:
      optionCardTokens.selectedOutlineColor$hover,
    [cardTokens.outlineColor$pressed]:
      optionCardTokens.selectedOutlineColor$pressed,
    [cardTokens.outlineColor$dragged]:
      optionCardTokens.selectedOutlineColor$dragged,
  },
  text: {
    fontFamily: optionCardTokens.textFont,
    lineHeight: optionCardTokens.textLineHeight,
    fontSize: optionCardTokens.textSize,
    letterSpacing: optionCardTokens.textLetterSpacing,
    fontWeight: optionCardTokens.textWeight,
    color: optionCardTokens.textColor,
  },
  text$disabled: {
    color: optionCardTokens.textColor$disabled,
    opacity: optionCardTokens.textOpacity$disabled,
  },
});

export const optionCardCardStyles = stylex.create({
  outline: {
    transitionProperty: 'border-color',
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
});
