import { createTheme, createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getDensity } from '~/helpers/styles/getDensity';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { PaperBase } from '../PaperBase';

const [tokensClassName, tokens] = createTheme({
  density: getDensity({ min: -3, max: 0 }),
  container: {
    size: '40px',
    shape: {
      topLeft: themeTokens.shape.corner.full,
      topRight: themeTokens.shape.corner.full,
      bottomRight: themeTokens.shape.corner.full,
      bottomLeft: themeTokens.shape.corner.full,
    },
    color: themeTokens.colorScheme.primaryContainer,
  },
  label: {
    color: themeTokens.colorScheme.onPrimaryContainer,
    typography: themeTokens.typeScale.title.md,
  },
});

const vars = {
  size: createVar(),
};

const classNames = createStyles({
  root: {
    vars: {
      [vars.size]: calc.add(px(tokens.container.size), px(tokens.density)),
      [PaperBase.styles.tokens.container.shape.topLeft]:
        tokens.container.shape.topLeft,
      [PaperBase.styles.tokens.container.shape.topRight]:
        tokens.container.shape.topRight,
      [PaperBase.styles.tokens.container.shape.bottomRight]:
        tokens.container.shape.bottomRight,
      [PaperBase.styles.tokens.container.shape.bottomLeft]:
        tokens.container.shape.bottomLeft,
      [PaperBase.styles.tokens.container.color]: tokens.container.color,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: vars.size,
    height: vars.size,
    overflow: 'hidden',
    userSelect: 'none',
    textTransform: 'uppercase',
    color: tokens.label.color,
  },
  image: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    objectFit: 'cover',
    // Hide alt text.
    color: 'transparent',
    // Hide the image broken icon, only works on Chrome.
    textIndent: 10000,
  },
  placeholder: {
    position: 'relative',
    width: '70%',
    height: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    ...getTypographyStyles(tokens.label.typography),
  },
});

export type IAvatarStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const avatarStyles = stylesFactory<IAvatarStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
