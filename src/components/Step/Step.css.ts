import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Button } from '../Button';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'disabled' | 'label-position' | 'state' | 'non-interactive';

const DENSITY = px(getDensity({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    leadingSpace: px(space(2)),
    trailingSpace: px(space(2)),
    // For a proper rendering, should be at least (StepConnector.thickness / 2).
    topSpace: px(space(2)),
    // For a proper rendering, should be at least (StepConnector.thickness / 2).
    bottomSpace: px(space(2)),
    shape: themeTokens.shape.corner.md,
  },
  label: {
    typography: themeTokens.typeScale.label.lg,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      completed: themeTokens.colorScheme.onSurface,
      error: themeTokens.colorScheme.error,
      interactive: themeTokens.colorScheme.primary,
      inactive: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      inactive: '1',
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  supportingText: {
    typography: themeTokens.typeScale.label.sm,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      completed: themeTokens.colorScheme.onSurface,
      error: themeTokens.colorScheme.error,
      interactive: themeTokens.colorScheme.onSurface,
      inactive: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      inactive: '1',
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  content: {
    typography: themeTokens.typeScale.body.md,
    color: themeTokens.colorScheme.onSurface,
  },
  connector: {
    shape: themeTokens.shape.corner.full,
    minLength: px(space(4)),
  },
});

const classNames = createStyles({
  root: {},
  button: {
    minWidth: 'unset',
    minHeight: 'unset',
    paddingTop: tokens.container.topSpace,
    paddingBottom: tokens.container.bottomSpace,

    vars: createTokensVars(Button.theme.tokens, {
      container: {
        shape: tokens.container.shape,
        leadingSpace: {
          normal: tokens.container.leadingSpace,
        },
        trailingSpace: {
          normal: tokens.container.trailingSpace,
        },
      },
    }),
  },
});

export type IStepThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const stepTheme = componentThemeFactory<IStepThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
