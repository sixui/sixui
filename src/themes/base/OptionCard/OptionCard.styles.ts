import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IOptionCardStyleKey } from '@/components/atoms/OptionCard';
import type { ICardStyleKey } from '@/components/atoms/Card';
import { componentVars as vars } from './OptionCard.stylex';
import { componentVars as cardVars } from '../Card/Card.stylex';
import { motionVars } from '../vars/motion.stylex';

type IOptionCardStyles = IStyles<IOptionCardStyleKey>;
export const styles: MapNamespaces<IOptionCardStyles> =
  stylex.create<IOptionCardStyles>({
    host: {
      [cardVars.containerColor]: 'unset',
    },
    host$selected: {
      [cardVars.outlineColor]: vars.selectedOutlineColor,
      [cardVars.outlineWidth]: vars.selectedOutlineWidth,
      [cardVars.outlineColor$disabled]: vars.selectedOutlineColor$disabled,
      [cardVars.outlineOpacity$disabled]: vars.selectedOutlineOpacity$disabled,
      [cardVars.outlineColor$focus]: vars.selectedOutlineColor$focus,
      [cardVars.outlineColor$hover]: vars.selectedOutlineColor$hover,
      [cardVars.outlineColor$pressed]: vars.selectedOutlineColor$pressed,
      [cardVars.outlineColor$dragged]: vars.selectedOutlineColor$dragged,
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

type ICardStyles = IStyles<ICardStyleKey>;
export const cardStyles: MapNamespaces<ICardStyles> =
  stylex.create<ICardStyles>({
    outline: {
      transitionProperty: 'border-color',
      transitionDuration: motionVars.duration$long3,
      transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
    },
  });
