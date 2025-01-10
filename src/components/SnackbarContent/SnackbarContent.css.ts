import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'with-trailing-action' | 'with-trailing-icon';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    space: px(space(4)),
    color: themeTokens.colorScheme.onSurface,
    elevation: elevationLevelPreset[3],
    shape: themeTokens.shape.corner.xs,
    minWidth: px(288),
    minHeight: px(48),
  },
  supportingText: {
    color: themeTokens.colorScheme.inverseOnSurface,
    typography: themeTokens.typeScale.body.md,
  },
  action: {
    trailingSpace: px(space(2)),
  },
  icon: {
    trailingSpace: px(space(3)),
  },
});

const classNames = createStyles({
  root: {
    padding: tokens.container.space,
    minHeight: tokens.container.minHeight,
    minWidth: tokens.container.minWidth,
    flexGrow: 'initial',

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        elevation: tokens.container.elevation,
        shape: tokens.container.shape,
      },
    }),

    '@media': {
      '(min-width: 0) and (max-width: 599)': {
        flexGrow: 1,
        minWidth: 'unset',
      },
    },

    selectors: {
      [getModifierSelector<IModifier>('with-trailing-action')]: {
        paddingRight: tokens.action.trailingSpace,
      },
      [getModifierSelector<IModifier>('with-trailing-icon')]: {
        paddingRight: tokens.icon.trailingSpace,
      },
    },
  },
  supportingText: {
    flexGrow: 1,
    color: tokens.supportingText.color,
    ...getTypographyStyles(tokens.supportingText.typography),
  },
  actions: {
    marginLeft: 'auto',
    alignItems: 'center',
    height: tokens.supportingText.typography.lineHeight,
  },
});

export type ISnackbarContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const snackbarContentTheme =
  componentThemeFactory<ISnackbarContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
