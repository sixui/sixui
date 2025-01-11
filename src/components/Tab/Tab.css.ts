import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { ITabVariant } from './Tab.types';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Button } from '../Button';
import { StateLayer } from '../StateLayer';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'disabled' | 'with-icon-and-label' | 'active';

const DENSITY = px(getDensity({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    shape: themeTokens.shape.corner.none,
    height: {
      normal: px(48),
      withIconAndLabelText: 'unset',
    },
    elevation: {
      normal: elevationLevelPreset[0],
      disabled: elevationLevelPreset[0],
    },
    color: {
      normal: themeTokens.colorScheme.surface,
      disabled: themeTokens.colorScheme.surface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  container$active: {
    color: {
      normal: 'inherit',
    },
  },
  stateLayer: {
    color: {
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.primary,
    },
    opacity: {
      hovered: themeTokens.state.stateLayerOpacity.hovered,
      pressed: themeTokens.state.stateLayerOpacity.pressed,
    },
  },
  stateLayer$active: {
    color: {
      hovered: 'inherit',
      pressed: 'inherit',
    },
    opacity: {
      hovered: themeTokens.state.stateLayerOpacity.hovered,
      pressed: themeTokens.state.stateLayerOpacity.pressed,
    },
  },
  icon: {
    size: px(18),
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      focused: themeTokens.colorScheme.onSurface,
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  icon$active: {
    color: {
      normal: 'inherit',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
    },
  },
  label: {
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      focused: themeTokens.colorScheme.onSurface,
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    typography: themeTokens.typeScale.title.sm,
  },
  label$active: {
    color: {
      normal: 'inherit',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
    },
  },
  activeIndicator: {
    shape: 'unset',
    height: 'unset',
    color: themeTokens.colorScheme.primary,
  },
});

const classNames = createStyles({
  root: {
    flexDirection: 'column',
    gap: px(space(1)),

    vars: createTokensVars(Button.theme.tokens, {
      container: {
        shape: tokens.container.shape,
        height: tokens.container.height.normal,
        elevation: {
          normal: tokens.container.elevation.normal,
          disabled: tokens.container.elevation.disabled,
        },
        color: {
          normal: tokens.container.color.normal,
          disabled: tokens.container.color.disabled,
        },
        opacity: {
          disabled: tokens.container.opacity.disabled,
        },
        leadingSpace: {
          normal: px(space(4)),
          withStartSlot: px(space(4)),
          withEndSlot: px(space(4)),
        },
        trailingSpace: {
          normal: px(space(4)),
          withStartSlot: px(space(4)),
          withEndSlot: px(space(4)),
        },
      },
      icon: {
        labelSpace: px(0),
      },
      label: {
        color: {
          normal: tokens.label.color.normal,
          focused: fallbackVar(
            tokens.label.color.focused,
            tokens.label.color.normal,
          ),
          hovered: fallbackVar(
            tokens.label.color.hovered,
            tokens.label.color.normal,
          ),
          pressed: fallbackVar(
            tokens.label.color.pressed,
            tokens.label.color.normal,
          ),
          disabled: tokens.label.color.disabled,
        },
        opacity: {
          disabled: tokens.label.opacity.disabled,
        },
        typography: tokens.label.typography,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('active')]: {
        vars: createTokensVars(Button.theme.tokens, {
          container: {
            color: {
              normal: fallbackVar(
                tokens.container$active.color.normal,
                tokens.container.color.normal,
              ),
            },
          },
          label: {
            color: {
              normal: fallbackVar(
                tokens.label$active.color.normal,
                tokens.label.color.normal,
              ),
              focused: fallbackVar(
                tokens.label$active.color.focused,
                tokens.label.color.focused,
              ),
              hovered: fallbackVar(
                tokens.label$active.color.hovered,
                tokens.label.color.hovered,
              ),
              pressed: fallbackVar(
                tokens.label$active.color.pressed,
                tokens.label.color.pressed,
              ),
            },
          },
        }),
      },
      [getModifierSelector<IModifier>('with-icon-and-label')]: {
        vars: createTokensVars(Button.theme.tokens, {
          container: {
            height: tokens.container.height.withIconAndLabelText,
          },
        }),
      },
    },
  },
  stateLayer: ({ root }) => ({
    vars: createTokensVars(StateLayer.theme.tokens, {
      color: {
        hovered: tokens.stateLayer.color.hovered,
        pressed: tokens.stateLayer.color.pressed,
      },
      opacity: {
        hovered: tokens.stateLayer.opacity.hovered,
        pressed: tokens.stateLayer.opacity.pressed,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('active', root)]: {
        vars: createTokensVars(StateLayer.theme.tokens, {
          color: {
            hovered: fallbackVar(
              tokens.stateLayer$active.color.hovered,
              tokens.stateLayer.color.hovered,
            ),
            pressed: fallbackVar(
              tokens.stateLayer$active.color.pressed,
              tokens.stateLayer.color.pressed,
            ),
          },
          opacity: {
            hovered: fallbackVar(
              tokens.stateLayer$active.opacity.hovered,
              tokens.stateLayer.opacity.hovered,
            ),
            pressed: fallbackVar(
              tokens.stateLayer$active.opacity.pressed,
              tokens.stateLayer.opacity.pressed,
            ),
          },
        }),
      },
    },
  }),
});

export type ITabThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: ITabVariant;
}>;

export const tabTheme = componentThemeFactory<ITabThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const tabThemeVariants = {
  primary: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          height: {
            withIconAndLabelText: px(64),
          },
        },
        label$active: {
          color: {
            normal: themeTokens.colorScheme.primary,
            focused: themeTokens.colorScheme.primary,
            hovered: themeTokens.colorScheme.primary,
            pressed: themeTokens.colorScheme.primary,
          },
        },
      }),
    },
  }),
  secondary: createStyles({
    //
  }),
};
