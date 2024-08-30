import { createTheme, style } from '@vanilla-extract/css';

import { stylesFactory, type IStylesFactory } from '~/utils/styles/stylesFactory';
import { themeTokens } from '../ThemeProvider';
import { PaperBase } from '../PaperBase';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

export type IPaperStyleName = keyof typeof paperStyles;

const [tokensClassName, tokens] = createTheme({
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
  },
  text: {
    color: themeTokens.colorScheme.onSurface,
  },
});

const classNames = {
  root: style({
    vars: {
      [PaperBase.styles.tokens.container.color]: tokens.container.color,
      [PaperBase.styles.tokens.container.elevation]: tokens.container.elevation,
      [PaperBase.styles.tokens.container.shape.topLeft]:
        tokens.container.shape.topLeft,
      [PaperBase.styles.tokens.container.shape.topRight]:
        tokens.container.shape.topRight,
      [PaperBase.styles.tokens.container.shape.bottomRight]:
        tokens.container.shape.bottomRight,
      [PaperBase.styles.tokens.container.shape.bottomLeft]:
        tokens.container.shape.bottomLeft,
      [PaperBase.styles.tokens.text.color]: tokens.text.color,
      [PaperBase.styles.tokens.outline.style]: tokens.outline.style,
    },
  }),
};

export type IPaperStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const paperStyles = stylesFactory<IPaperStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
