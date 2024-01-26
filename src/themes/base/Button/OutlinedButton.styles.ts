import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IButtonStyleKey } from '@/components/atoms/Button';
import { componentVars as vars } from './Button.stylex';

// https://github.com/material-components/material-web/blob/main/button/internal/_outlined-button.scss
type IButtonStyles = IStyles<IButtonStyleKey>;
export const styles: MapNamespaces<IButtonStyles> =
  stylex.create<IButtonStyles>({
    outline: {
      inset: 0,
      pointerEvents: 'none',
      borderStyle: 'solid',
      borderWidth: vars.outlineWidth,
      position: 'absolute',
      boxSizing: 'border-box',
      borderColor: {
        default: vars.outlineColor,
        ':is([data-focused])': vars.outlineColor$focus,
        ':is([data-pressed])': vars.outlineColor$pressed,
      },
      borderRadius: vars.containerShape,
    },
    outline$disabled: {
      borderColor: vars.outlineColor$disabled,
      opacity: vars.outlineOpacity$disabled,
    },
  });
