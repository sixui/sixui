import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IOptionCardStyleKey } from '@/components/atoms/OptionCard';
import { componentVars as vars } from './OptionCard.stylex';
import { cardTokens } from '@/components/atoms/Card/Card.stylex';
import { motionVars } from '../vars/motion.stylex';
import { ICardStyleKey } from '@/components/atoms/Card/Card.styles';

type IOptionCardStyles = IStyles<IOptionCardStyleKey>;
export const styles: MapNamespaces<IOptionCardStyles> =
  stylex.create<IOptionCardStyles>({
    host: {
      [cardTokens.containerColor]: vars.containerColor,
    },
    host$selected: {
      [cardTokens.outlineColor]: vars.selectedOutlineColor,
      [cardTokens.outlineWidth]: vars.selectedOutlineWidth,
      [cardTokens.outlineColor$disabled]: vars.selectedOutlineColor$disabled,
      [cardTokens.outlineOpacity$disabled]:
        vars.selectedOutlineOpacity$disabled,
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

type ICardStyles = IStyles<ICardStyleKey>;
export const cardStyles: MapNamespaces<ICardStyles> =
  stylex.create<ICardStyles>({
    outline: {
      transitionProperty: 'border-color',
      transitionDuration: motionVars.duration$long3,
      transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
    },
  });
