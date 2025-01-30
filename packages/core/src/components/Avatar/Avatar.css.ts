import { createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { getDensity } from '~/helpers/styles/getDensity';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { COMPONENT_NAME } from './Avatar.constants';

const DENSITY = px(getDensity({ min: -3, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  size: px(40),
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
      [vars.size]: calc.add(tokens.size, DENSITY),
      ...createTokensVars(PaperBase.theme.tokens, {
        container: {
          color: themeTokens.colorScheme.primaryContainer,
          shape: px(themeTokens.shape.corner.circle),
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
