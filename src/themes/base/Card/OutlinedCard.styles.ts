import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ICardStyleKey } from '@/components/atoms/Card';
import { componentVars as vars } from './Card.stylex';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/_outlined-card.scss

type IOutlinedCardStyles = IStyles<ICardStyleKey>;
export const styles: MapNamespaces<IOutlinedCardStyles> =
  stylex.create<IOutlinedCardStyles>({
    outline: {
      inset: 0,
      pointerEvents: 'none',
      borderStyle: 'solid',
      borderWidth: vars.outlineWidth,
      position: 'absolute',
      borderColor: vars.outlineColor,
      borderRadius: 'inherit',
    },
    outline$actionable: {
      borderColor: {
        default: vars.outlineColor,
        ':is([data-focused])': vars.outlineColor$focus,
        ':is([data-hovered])': vars.outlineColor$hover,
        ':is([data-pressed])': vars.outlineColor$pressed,
      },
    },
    outline$disabled: {
      borderColor: vars.outlineColor$disabled,
      opacity: vars.outlineOpacity$disabled,
    },
    outline$dragged: {
      borderColor: vars.outlineColor$dragged,
    },
  });
