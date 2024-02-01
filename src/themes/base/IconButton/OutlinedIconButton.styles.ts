import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IIconButtonStyleKey } from '@/components/atoms/IconButton';
import { componentVars as vars } from './IconButton.stylex';

// https://github.com/material-components/material-web/blob/main/button/internal/_outlined-button.scss
type IIconButtonStyles = IStyles<IIconButtonStyleKey>;
export const styles: MapNamespaces<IIconButtonStyles> =
  stylex.create<IIconButtonStyles>({
    outline: {
      inset: 0,
      borderStyle: 'solid',
      borderWidth: vars.outlineWidth,
      position: 'absolute',
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
