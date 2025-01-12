import { createTheme, fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';



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
import { FocusRing } from '../FocusRing';
import { StateLayer } from '../StateLayer';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';


type IModifier = 'disabled' | 'with-icon' | 'with-label' | 'active';

const DENSITY = px(getDensity({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    shape: themeTokens.shape.corner.none,
    height: {
      normal: px(48),
      withIconAndLabelText: px(48),
    },
    elevation: {
      normal: elevationLevelPreset[0],
      disabled: elevationLevelPreset[0],
    },
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
    opacity: {
      disabled: 'unset',
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
    height: px(themeTokens.outline.width.sm),
    color: themeTokens.colorScheme.primary,
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(Button.theme.tokens, {
      container: {
        shape: tokens.container.shape,
        height: calc.add(tokens.container.height.normal, DENSITY),
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
                tokens.label$active.color.normal,
                tokens.label.color.focused,
              ),
              hovered: fallbackVar(
                tokens.label$active.color.hovered,
                tokens.label$active.color.normal,
                tokens.label.color.hovered,
              ),
              pressed: fallbackVar(
                tokens.label$active.color.pressed,
                tokens.label$active.color.normal,
                tokens.label.color.pressed,
              ),
            },
          },
        }),
      },
      [getModifierSelector<IModifier>(['with-icon', 'with-label'])]: {
        vars: createTokensVars(Button.theme.tokens, {
          container: {
            height: calc.add(
              tokens.container.height.withIconAndLabelText,
              DENSITY,
            ),
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
  activeIndicator: ({ root }) => ({
    position: 'absolute',
    transformOrigin: 'left bottom',
    backgroundColor: tokens.activeIndicator.color,
    borderRadius: tokens.activeIndicator.shape,
    height: tokens.activeIndicator.height,
    inset: 'auto 0 0 0',
    // Hidden unless the tab is selected.
    opacity: 0,

    selectors: {
      [getModifierSelector<IModifier>('active', root)]: {
        opacity: 1,
      },
    },
  }),
  focusRing: {},
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
      flexDirection: 'column',
      gap: px(space(1)),

      vars: {
        ...createTokensVars(tokens, {
          container: {
            height: {
              withIconAndLabelText: px(64),
            },
          },
          label$active: {
            color: {
              normal: themeTokens.colorScheme.primary,
            },
          },
          activeIndicator: {
            shape: `${px(3)} ${px(3)} 0 0`,
            height: themeTokens.outline.width.md,
          },
        }),
        ...createTokensVars(Button.theme.tokens, {
          icon: {
            labelSpace: px(0),
          },
        }),
      },
    },
    activeIndicator: {
      marginLeft: px(space(4)),
      marginRight: px(space(4)),
    },
    focusRing: {
      vars: createTokensVars(FocusRing.theme.tokens, {
        shape: themeTokens.shape.corner.sm,
        offset: {
          inward: `0 0 ${px(calc.add(themeTokens.outline.width.md, '1px'))} 0`,
        },
      }),
    },
  }),
  secondary: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        icon$active: {
          color: {
            normal: themeTokens.colorScheme.onSurface,
          },
        },
        label$active: {
          color: {
            normal: themeTokens.colorScheme.onSurface,
          },
        },
      }),
    },
    focusRing: {
      vars: createTokensVars(FocusRing.theme.tokens, {
        shape: themeTokens.shape.corner.sm,
        offset: {
          inward: `0 0 ${px(calc.add(themeTokens.outline.width.sm, '1px'))} 0`,
        },
      }),
    },
  }),
};