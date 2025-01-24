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
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    color: themeTokens.colorScheme.inverseSurface,
    shape: px(themeTokens.shape.corner.xs),
    maxWidth: px(215),
    minHeight: px(24),
    topSpace: px(space(2)),
    bottomSpace: px(space(2)),
    leadingSpace: px(space(2)),
    trailingSpace: px(space(2)),
    elevation: elevationLevelPreset[0],
  },
  supportingText: {
    color: themeTokens.colorScheme.inverseOnSurface,
    typography: themeTokens.typeScale.body.sm,
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: {
          normal: tokens.container.color,
        },
        elevation: {
          normal: tokens.container.elevation,
        },
        shape: tokens.container.shape,
      },
    }),

    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    paddingTop: tokens.container.topSpace,
    paddingBottom: tokens.container.bottomSpace,
    paddingLeft: tokens.container.leadingSpace,
    paddingRight: tokens.container.trailingSpace,
    maxWidth: tokens.container.maxWidth,
    minHeight: tokens.container.minHeight,
  },
  supportingText: {
    color: tokens.supportingText.color,
    ...getTypographyStyles(tokens.supportingText.typography),
  },
  cursor: {
    fill: tokens.container.color,
  },
});

export type IPlainTooltipContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const plainTooltipContentTheme =
  componentThemeFactory<IPlainTooltipContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
