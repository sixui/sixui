import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { elevationTokens } from '@/components/Elevation/Elevation.stylex';
import { paperTokens } from '../Paper.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-outlined-Paper.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-outlined-Paper.scss

export const outlinedPaperStyles = stylex.create({
  host: {
    [paperTokens.containerColor]: colorSchemeTokens.surface,
    [paperTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [paperTokens.outlineStyle]: 'solid',
  },
});
