import { createTheme, createVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { stylesFactory, type IStylesFactory } from '~/utils/stylesFactory';
import { getVariantSelector } from '~/helpers/styles/getVariantSelector';
import { getDensity } from '~/helpers/styles/getDensity';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  density: getDensity({ min: -3, max: 0 }),
  container: {
    size: '40px',
    shape: themeTokens.shape.corner.full,
    color: themeTokens.colorScheme.primaryContainer,
  },
  labelText: {
    color: themeTokens.colorScheme.onPrimaryContainer,
    typography: themeTokens.typeScale.title.md,
  },
});

const vars = {
  size: createVar(),
  shape: createVar(),
};

const classNames = {
  root: style({
    vars: {
      [vars.size]: calc.add(px(tokens.container.size), tokens.density),
      [vars.shape]: px(tokens.container.shape),
    },
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: vars.size,
    height: vars.size,
    overflow: 'hidden',
    borderRadius: vars.shape,
    userSelect: 'none',
    backgroundColor: tokens.container.color,

    selectors: {
      [getVariantSelector('rounded')]: {
        vars: {
          [tokens.container.shape]: themeTokens.shape.corner.full,
        },
      },
      [getVariantSelector('squared')]: {
        vars: {
          [tokens.container.shape]: themeTokens.shape.corner.sm,
        },
      },
    },
  }),
  image: style({
    width: '100%',
    height: '100%',
    textAlign: 'center',
    objectFit: 'cover',
    // Hide alt text.
    color: 'transparent',
    // Hide the image broken icon, only works on Chrome.
    textIndent: 10000,
  }),
  placeholder: style({
    width: '70%',
    height: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    textTransform: 'uppercase',
    color: tokens.labelText.color,
    ...getTypographyStyles(tokens.labelText.typography),
  }),
};

export type IAvatarStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const avatarStyles = stylesFactory<IAvatarStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
