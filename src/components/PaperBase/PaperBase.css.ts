import { createTheme, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { stylesFactory, type IStylesFactory } from '~/utils/stylesFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { themeTokens } from '../ThemeProvider';

export type IPaperBaseStyleName = keyof typeof paperBaseStyles;

export const [tokensClassName, tokens] = createTheme({
  container: {
    color: themeTokens.colorScheme.surface,
    // elevation:
  },
  containerColor: themeTokens.colorScheme.surface,
  containerElevation: elevationTokens.boxShadow$level0,
  containerShape$topLeft: shapeTokens.corner$none,
  containerShape$topRight: shapeTokens.corner$none,
  containerShape$bottomRight: shapeTokens.corner$none,
  containerShape$bottomLeft: shapeTokens.corner$none,

  // outline
  outlineStyle: 'none',
  outlineColor: themeTokens.colorScheme.outlineVariant,
  outlineWidth: outlineTokens.width$xs,

  // text
  textColor: themeTokens.colorScheme.onSurface,
});

export type IPaperBaseStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const paperBaseStyles = stylesFactory<IPaperBaseStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
