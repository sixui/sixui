import { createTheme, fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { IInteraction } from '~/hooks/useInteractions';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';

type IModifier = IInteraction | 'disabled' | 'checked';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  width: px(52),
  height: px(32),
  container: {
    color: {
      normal: themeTokens.colorScheme.surfaceContainerHighest,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: 'inherit',
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
    shape: px(themeTokens.shape.corner.full),
  },
  container$checked: {
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
    },
  },
  outline: {
    style: 'solid',
    color: {
      normal: themeTokens.colorScheme.outline,
      disabled: themeTokens.colorScheme.onSurface,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
    },
    width: px(themeTokens.outline.width.sm),
  },
  handle: {
    shape: px(themeTokens.shape.corner.full),
    color: {
      normal: themeTokens.colorScheme.outline,
      disabled: themeTokens.colorScheme.onSurfaceVariant,
      hovered: themeTokens.colorScheme.onSurfaceVariant,
      focused: themeTokens.colorScheme.onSurfaceVariant,
      pressed: themeTokens.colorScheme.onSurfaceVariant,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    width: {
      normal: px(16),
      withIcon: px(24),
      pressed: px(28),
    },
    height: {
      normal: px(16),
      withIcon: px(24),
      pressed: px(28),
    },
  },
  handle$checked: {
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.surface,
      focused: themeTokens.colorScheme.primaryContainer,
      hovered: themeTokens.colorScheme.primaryContainer,
      pressed: themeTokens.colorScheme.primaryContainer,
    },
    opacity: {
      disabled: '1',
    },
    width: px(24),
    height: px(24),
  },
  icon: {
    color: {
      normal: themeTokens.colorScheme.surfaceContainerHighest,
      disabled: themeTokens.colorScheme.surface,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
    },
    opacity: {
      disabled: '0.76',
    },
    size: px(16),
  },
  icon$checked: {
    color: {
      normal: themeTokens.colorScheme.onPrimaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    size: px(16),
  },
  stateLayer: {
    shape: px(themeTokens.shape.corner.full),
    size: px(themeTokens.density.minTargetSize),
    color: {
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      hovered: themeTokens.state.stateLayerOpacity.hovered,
      pressed: themeTokens.state.stateLayerOpacity.pressed,
    },
  },
  stateLayer$checked: {
    color: {
      hovered: themeTokens.colorScheme.primary,
      pressed: themeTokens.colorScheme.primary,
    },
    opacity: {
      hovered: themeTokens.state.stateLayerOpacity.hovered,
      pressed: themeTokens.state.stateLayerOpacity.pressed,
    },
  },
});

const classNames = createStyles({
  root: {
    display: 'inline-flex',
    outline: 'none',
    verticalAlign: 'top',
    cursor: 'pointer',
    width: tokens.width,
    height: tokens.height,

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: tokens.container,
      outline: tokens.outline,
    }),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        cursor: 'default',
        pointerEvents: 'none',
      },
    },
  },
  // switch: {
  //   alignItems: 'center',
  //   display: 'inline-flex',
  //   flexShrink: 0, // Stop from collapsing in flex containers
  //   position: 'relative',
  //   width: tokens.track.width,
  //   height: calc.add(tokens.track.height, DENSITY),
  //   borderRadius: tokens.track.shape.topLeft,

  //   [switchStateTokens.stateLayerColor$hover]:
  //     switchTokens.stateLayerColor$hover,
  //   [switchStateTokens.stateLayerOpacity$hover]:
  //     switchTokens.stateLayerOpacity$hover,
  // },
});

export type ISwitchThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const basicTemplateTheme = componentThemeFactory<ISwitchThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
