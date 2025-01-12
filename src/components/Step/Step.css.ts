import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'disabled';

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
  bulletPoint: {
    size: px(24),
    shape: themeTokens.shape.corner.circle,
    color: {
      normal: themeTokens.colorScheme.primary,
      completed: themeTokens.colorScheme.primary,
      error: themeTokens.colorScheme.error,
      inactive: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      inactive: '0.16',
      disabled: themeTokens.state.opacity.disabled,
    },
    space: px(space(2)),
  },
  bulletPointLabel: {
    typography: themeTokens.typeScale.label.md,
    color: {
      normal: themeTokens.colorScheme.onPrimary,
      completed: themeTokens.colorScheme.onPrimary,
      error: themeTokens.colorScheme.onError,
      inactive: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      inactive: '1',
      disabled: themeTokens.state.opacity.disabled,
    },
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
