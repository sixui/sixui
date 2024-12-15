import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IFabVariant } from './Fab.types';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Button } from '../Button';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'extended' | 'lowered';

const [tokensClassName, tokens] = createTheme({
  container: {
    size: px(56),
    shape: px(themeTokens.shape.corner.lg),
    color: {
      normal: {
        regular: 'unset',
        lowered: 'unset',
      },
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
    elevation: {
      normal: {
        regular: elevationLevelPreset[3],
        lowered: elevationLevelPreset[1],
      },
      focused: {
        regular: elevationLevelPreset[3],
        lowered: elevationLevelPreset[1],
      },
      hovered: {
        regular: elevationLevelPreset[4],
        lowered: elevationLevelPreset[2],
      },
      pressed: {
        regular: elevationLevelPreset[3],
        lowered: elevationLevelPreset[1],
      },
      disabled: elevationLevelPreset[0],
    },
  },
  icon: {
    size: px(24),
    color: {
      normal: 'inherit',
      hovered: 'inherit',
      focused: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  stateLayer: {
    color: {
      hovered: 'unset',
      pressed: 'unset',
    },
    opacity: {
      hovered: themeTokens.state.stateLayerOpacity.hovered,
      pressed: themeTokens.state.stateLayerOpacity.pressed,
    },
  },
  label: {
    color: {
      normal: 'inherit',
      hovered: 'inherit',
      focused: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    typography: themeTokens.typeScale.label.lg,
  },
});

const classNames = createStyles({
  root: {
    zIndex: themeTokens.zIndex.overlay,
    minWidth: 'unset',
    width: tokens.container.size,
    height: tokens.container.size,

    vars: createTokensVars(Button.theme.tokens, {
      leadingSpace: {
        normal: '0px',
        withLeadingIcon: '0px',
        withTrailingIcon: '0px',
      },
      trailingSpace: {
        normal: '0px',
        withLeadingIcon: '0px',
        withTrailingIcon: '0px',
      },
      gap: px(space(3)),
      container: {
        shape: tokens.container.shape,
        elevation: {
          normal: tokens.container.elevation.normal.regular,
          focused: tokens.container.elevation.focused.regular,
          hovered: tokens.container.elevation.hovered.regular,
          pressed: tokens.container.elevation.pressed.regular,
          disabled: tokens.container.elevation.disabled,
        },
        color: {
          normal: tokens.container.color.normal.regular,
          disabled: tokens.container.color.disabled,
        },
        opacity: {
          disabled: tokens.container.opacity.disabled,
        },
      },
      icon: tokens.icon,
      stateLayer: tokens.stateLayer,
      label: tokens.label,
    }),

    selectors: {
      [getModifierSelector<IModifier>('extended')]: {
        vars: {
          minWidth: tokens.container.size,
          width: 'auto',
          ...createTokensVars(Button.theme.tokens, {
            leadingSpace: {
              normal: px(space(6)),
              withLeadingIcon: px(space(4)),
            },
            trailingSpace: {
              normal: px(space(6)),
              withLeadingIcon: px(space(6)),
            },
          }),
        },
      },
      [getModifierSelector<IModifier>('lowered')]: {
        vars: createTokensVars(Button.theme.tokens, {
          container: {
            elevation: {
              normal: fallbackVar(
                tokens.container.elevation.normal.lowered,
                tokens.container.elevation.normal.regular,
              ),
              focused: fallbackVar(
                tokens.container.elevation.focused.lowered,
                tokens.container.elevation.normal.lowered,
                tokens.container.elevation.focused.regular,
              ),
              hovered: fallbackVar(
                tokens.container.elevation.hovered.lowered,
                tokens.container.elevation.normal.lowered,
                tokens.container.elevation.hovered.regular,
              ),
              pressed: fallbackVar(
                tokens.container.elevation.pressed.lowered,
                tokens.container.elevation.normal.lowered,
                tokens.container.elevation.pressed.regular,
              ),
            },
            color: {
              normal: fallbackVar(
                tokens.container.color.normal.lowered,
                tokens.container.color.normal.regular,
              ),
            },
          },
        }),
      },
    },
  },
});

export type IFabThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  variant: IFabVariant;
  modifier: IModifier;
}>;

export const fabTheme = componentThemeFactory<IFabThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const fabThemeVariants = {
  surface: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: {
              regular: themeTokens.colorScheme.surfaceContainerHigh,
              lowered: themeTokens.colorScheme.surfaceContainerLow,
            },
          },
        },
        label: {
          color: {
            normal: themeTokens.colorScheme.primary,
          },
        },
      }),
    },
  }),
  primary: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: {
              regular: themeTokens.colorScheme.primaryContainer,
            },
          },
        },
        label: {
          color: {
            normal: themeTokens.colorScheme.onPrimaryContainer,
          },
        },
      }),
    },
  }),
  secondary: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: {
              regular: themeTokens.colorScheme.secondaryContainer,
            },
          },
        },
        label: {
          color: {
            normal: themeTokens.colorScheme.onSecondaryContainer,
          },
        },
      }),
    },
  }),
  tertiary: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: {
              regular: themeTokens.colorScheme.tertiaryContainer,
            },
          },
        },
        label: {
          color: {
            normal: themeTokens.colorScheme.onTertiaryContainer,
          },
        },
      }),
    },
  }),
  branded: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: {
              regular: themeTokens.colorScheme.surfaceContainerHigh,
              lowered: themeTokens.colorScheme.surfaceContainerLow,
            },
          },
        },
        label: {
          color: {
            normal: themeTokens.colorScheme.primary,
          },
        },
        icon: {
          size: px(36),
        },
      }),
    },
  }),
};
