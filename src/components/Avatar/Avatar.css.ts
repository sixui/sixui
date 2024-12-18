import { createTheme, createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';

const DENSITY = px(getDensity({ min: -3, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  container: {
    size: px(40),
    shape: {
      topLeft: px(themeTokens.shape.corner.full),
      topRight: px(themeTokens.shape.corner.full),
      bottomRight: px(themeTokens.shape.corner.full),
      bottomLeft: px(themeTokens.shape.corner.full),
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
      [vars.size]: calc.add(tokens.container.size, DENSITY),
      ...createTokensVars(PaperBase.theme.tokens, {
        container: {
          color: {
            normal: tokens.container.color,
          },
          shape: tokens.container.shape,
        },
      }),
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
    aspectRatio: '1',
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

export type IAvatarThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const avatarTheme = componentThemeFactory<IAvatarThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
