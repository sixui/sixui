import { createTheme, style } from '@vanilla-extract/css';

import { stylesFactory, type IStylesFactory } from '~/utils/stylesFactory';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';
import { Elevation } from '../Elevation';

export type IPaperBaseStyleName = keyof typeof paperBaseStyles;

export const [tokensClassName, tokens] = createTheme({
  container: {
    color: themeTokens.colorScheme.surface,
    elevation: elevationLevelPreset[0],
    shape: {
      topLeft: themeTokens.shape.corner.none,
      topRight: themeTokens.shape.corner.none,
      bottomRight: themeTokens.shape.corner.none,
      bottomLeft: themeTokens.shape.corner.none,
    },
  },
  outline: {
    style: 'none',
    color: themeTokens.colorScheme.outlineVariant,
    width: themeTokens.outline.width.xs,
  },
  text: {
    color: themeTokens.colorScheme.onSurface,
  },
});

const classNames = {
  root: style({
    borderTopLeftRadius: px(tokens.container.shape.topLeft),
    borderTopRightRadius: px(tokens.container.shape.topRight),
    borderBottomRightRadius: px(tokens.container.shape.bottomRight),
    borderBottomLeftRadius: px(tokens.container.shape.bottomLeft),
    position: 'relative',
    color: tokens.text.color,
  }),
  elevation: style({
    vars: {
      [Elevation.styles.tokens.level]: tokens.container.elevation,
    },
  }),
  background: style({
    backgroundColor: tokens.container.color,
    borderRadius: 'inherit',
    inset: 0,
    position: 'absolute',
  }),
  outline: style({
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderStyle: tokens.outline.style,
    borderWidth: px(tokens.outline.width),
    borderColor: tokens.outline.color,
    borderRadius: 'inherit',
  }),
};

export type IPaperBaseStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const paperBaseStyles = stylesFactory<IPaperBaseStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
