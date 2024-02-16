import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IButtonStyleKey } from '@/components/atoms/Button';

// https://github.com/material-components/material-web/blob/main/button/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/button/internal/_elevation.scss
type IButtonStyles = IStyles<IButtonStyleKey>;
export const styles: MapNamespaces<IButtonStyles> =
  stylex.create<IButtonStyles>({
    host: {
      display: 'inline-flex',
      position: 'relative',
      cursor: 'pointer',
      // Long labels are cut off with ellipsis by default. `text-overflow` and `text-wrap` can
      // customize this.
      textOverflow: 'ellipsis',
      textWrap: 'nowrap',
      userSelect: 'none',
      textDecoration: 'none',
    },
    host$disabled: {
      cursor: 'default',
      pointerEvents: 'none',
    },
    touchTarget: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      transform: 'translateY(-50%)',
    },
    background: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
    },
  });
