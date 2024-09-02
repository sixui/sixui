import { createTheme, style } from '@vanilla-extract/css';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
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
    position: 'relative',
    color: tokens.text.color,
  }),
  elevation: style({
    vars: {
      [Elevation.styles.tokens.level]: tokens.container.elevation,
    },
  }),
  background: style({
    // Separate node to support opacity changes.
    backgroundColor: tokens.container.color,
    borderRadius: 'inherit',
    inset: 0,
    position: 'absolute',
  }),
  outline: style({
    // Separate node to support opacity changes.
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
