import { createTheme, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { getDensity } from '~/helpers/styles/getDensity';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { themeTokens } from '../ThemeProvider';
import { colorSchemeTokens } from '../ColorScheme';

export type IPaperBaseStyleName = keyof typeof paperBaseStyles;

export const [paperBaseTheme, paperBaseTokens] = createTheme({
  container: {
    color: colorSchemeTokens.surface,
    // elevation:
  },
  containerColor: colorSchemeTokens.surface,
  containerElevation: elevationTokens.boxShadow$level0,
  containerShape$topLeft: shapeTokens.corner$none,
  containerShape$topRight: shapeTokens.corner$none,
  containerShape$bottomRight: shapeTokens.corner$none,
  containerShape$bottomLeft: shapeTokens.corner$none,

  // outline
  outlineStyle: 'none',
  outlineColor: colorSchemeTokens.outlineVariant,
  outlineWidth: outlineTokens.width$xs,

  // text
  textColor: colorSchemeTokens.onSurface,
});

const localTokens = {
  //
};

const root = style({
  vars: {
    //
  },
  //
});

export const paperBaseStyles = {
  root,
  //
};
