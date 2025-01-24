import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { cssLayers, themeTokens } from '~/components/ThemeProvider';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  minSize: px(16),
  dotScale: '0.5', // 8px
  label: {
    color: themeTokens.colorScheme.onError,
    typography: themeTokens.typeScale.label.sm,
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: themeTokens.colorScheme.error,
        shape: px(themeTokens.shape.corner.full),
      },
    }),

    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    minWidth: tokens.minSize,
    height: tokens.minSize,
    padding: px(space(1)),
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    whiteSpace: 'nowrap',
  },
  root$dot: {
    transform: `scale(${tokens.dotScale})`,
    padding: 0,
  },
  root$invisible: {
    transform: 'scale(0)',
  },
  label: {
    position: 'relative',
    color: tokens.label.color,
    ...getTypographyStyles(tokens.label.typography),
  },
});

export type IBadgeThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const badgeTheme = componentThemeFactory<IBadgeThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
