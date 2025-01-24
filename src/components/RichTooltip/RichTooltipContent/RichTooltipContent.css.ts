import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { cssLayers, themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';

type IModifier = 'with-actions';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    color: themeTokens.colorScheme.surfaceContainer,
    shape: px(themeTokens.shape.corner.md),
    maxWidth: px(315),
    elevation: elevationLevelPreset[2],
    topSpace: px(space(3)),
    bottomSpace: {
      normal: px(space(3)),
      withActions: px(space(1)),
    },
    leadingSpace: px(space(4)),
    trailingSpace: px(space(4)),
    actionsBottomSpace: px(space(2)),
  },
  subhead: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.title.sm,
  },
  supportingText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.body.md,
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
    paddingLeft: tokens.container.leadingSpace,
    paddingRight: tokens.container.trailingSpace,
    maxWidth: tokens.container.maxWidth,
  },
  content: ({ root }) => ({
    paddingTop: tokens.container.topSpace,
    paddingBottom: tokens.container.bottomSpace.normal,

    selectors: {
      [getModifierSelector<IModifier>('with-actions', root)]: {
        paddingBottom: tokens.container.bottomSpace.withActions,
      },
    },
  }),
  subhead: {
    color: tokens.subhead.color,
    ...getTypographyStyles(tokens.subhead.typography),
  },
  supportingText: {
    color: tokens.supportingText.color,
    ...getTypographyStyles(tokens.supportingText.typography),
  },
  actions: {
    paddingBottom: tokens.container.actionsBottomSpace,
    marginLeft: calc.negate(px(space(3))),
    marginRight: calc.negate(px(space(3))),
  },
  cursor: {
    fill: themeTokens.colorScheme.primary,
  },
});

export type IRichTooltipContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const richTooltipContentTheme =
  componentThemeFactory<IRichTooltipContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
