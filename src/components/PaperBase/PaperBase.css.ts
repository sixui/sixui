import { createTheme } from '@vanilla-extract/css';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';
import { Elevation } from '../Elevation';
import { createStyles } from '~/utils/styles/createStyles';

export type IPaperBaseStyleName = keyof typeof paperBaseStyles;

export const [tokensClassName, tokens] = createTheme({
  container: {
    color: themeTokens.colorScheme.surface,
    opacity: '1',
    elevation: elevationLevelPreset[0],
    shape: {
      topLeft: themeTokens.shape.corner.none,
      topRight: themeTokens.shape.corner.none,
      bottomRight: themeTokens.shape.corner.none,
      bottomLeft: themeTokens.shape.corner.none,
    },
  },
  outline: {
    style: 'solid',
    color: themeTokens.colorScheme.outlineVariant,
    width: themeTokens.outline.width.none,
  },
  text: {
    color: themeTokens.colorScheme.onSurface,
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    color: tokens.text.color,
    borderTopLeftRadius: tokens.container.shape.topLeft,
    borderTopRightRadius: tokens.container.shape.topRight,
    borderBottomRightRadius: tokens.container.shape.bottomRight,
    borderBottomLeftRadius: tokens.container.shape.bottomLeft,
  },
  elevation: {
    vars: {
      [Elevation.styles.tokens.level]: tokens.container.elevation,
    },
  },
  background: {
    // Separate node to support opacity changes.
    backgroundColor: tokens.container.color,
    opacity: tokens.container.opacity,
    borderRadius: 'inherit',
    inset: px(tokens.outline.width),
    position: 'absolute',
  },
  outline: {
    // Separate node to support opacity changes.
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderStyle: tokens.outline.style,
    borderWidth: px(tokens.outline.width),
    borderColor: tokens.outline.color,
    borderRadius: 'inherit',
  },
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
