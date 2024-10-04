import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IIconButtonVariant } from './IconButton.types';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Button } from '../Button';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'toggle' | 'selected';

const [tokensClassName, tokens] = createTheme({
  container: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
    size: px(40),
    shape: px(themeTokens.shape.corner.full),
  },
  selectedContainer: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
  },
  unselectedContainer: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
  },
  icon: {
    color: {
      normal: themeTokens.colorScheme.onSurface,
      hovered: 'inherit',
      focused: 'inherit',
      pressed: 'inherit',
      disabled: 'inherit',
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    size: px(18),
  },
  toggleIcon: {
    color: {
      normal: 'inherit',
      hovered: 'inherit',
      focused: 'inherit',
      pressed: 'inherit',
    },
  },
  toggleSelectedIcon: {
    color: {
      normal: 'inherit',
      hovered: 'inherit',
      focused: 'inherit',
      pressed: 'inherit',
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
  toggleStateLayer: {
    color: {
      hovered: 'unset',
      pressed: 'unset',
    },
  },
  toggleSelectedStateLayer: {
    color: {
      hovered: 'unset',
      pressed: 'unset',
    },
  },
  outline: {
    style: 'unset',
    width: px(themeTokens.outline.width.none),
    color: {
      normal: themeTokens.colorScheme.outline,
      disabled: themeTokens.colorScheme.onSurface,
      focused: themeTokens.colorScheme.outline,
      pressed: themeTokens.colorScheme.outline,
    },
    opacity: {
      disabled: themeTokens.state.outlineOpacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    width: tokens.container.size,
    flexShrink: 0,

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
      stateLayer: tokens.stateLayer,
      container: {
        elevation: {
          normal: elevationLevelPreset[0],
        },
        minWidth: tokens.container.size,
        height: tokens.container.size,
        shape: {
          topLeft: px(tokens.container.shape),
          topRight: px(tokens.container.shape),
          bottomRight: px(tokens.container.shape),
          bottomLeft: px(tokens.container.shape),
        },
        opacity: tokens.container.opacity,
        color: tokens.container.color,
      },
      label: {
        typography: {
          lineHeight: tokens.icon.size,
        },
      },
      icon: tokens.icon,
      outline: tokens.outline,
    }),

    selectors: {
      [getModifierSelector<IModifier>('toggle')]: {
        vars: createTokensVars(Button.theme.tokens, {
          stateLayer: tokens.toggleStateLayer,
          container: tokens.unselectedContainer,
          icon: tokens.toggleIcon,
        }),
      },
      [getModifierSelector<IModifier>(['toggle', 'selected'])]: {
        vars: createTokensVars(Button.theme.tokens, {
          stateLayer: tokens.toggleSelectedStateLayer,
          container: tokens.selectedContainer,
          icon: tokens.toggleSelectedIcon,
        }),
      },
    },
  },
});

export type IIconButtonThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  variant: IIconButtonVariant;
  modifier: IModifier;
}>;

export const iconButtonTheme = componentThemeFactory<IIconButtonThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const iconButtonThemeVariants = {
  standard: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        icon: {
          color: {
            normal: themeTokens.colorScheme.onSurfaceVariant,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        toggleIcon: {
          color: {
            normal: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        toggleSelectedIcon: {
          color: {
            normal: themeTokens.colorScheme.primary,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        toggleStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        toggleSelectedStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
      }),
    },
  }),
  filled: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: themeTokens.colorScheme.primary,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        unselectedContainer: {
          color: {
            normal: themeTokens.colorScheme.surfaceContainerHighest,
          },
        },
        selectedContainer: {
          color: {
            normal: themeTokens.colorScheme.primary,
          },
        },
        icon: {
          color: {
            normal: themeTokens.colorScheme.onPrimary,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        toggleIcon: {
          color: {
            normal: themeTokens.colorScheme.primary,
          },
        },
        toggleSelectedIcon: {
          color: {
            normal: themeTokens.colorScheme.onPrimary,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onPrimary,
          },
        },
        toggleStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.primary,
          },
        },
        toggleSelectedStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onPrimary,
          },
        },
      }),
    },
  }),
  filledTonal: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: themeTokens.colorScheme.secondaryContainer,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        unselectedContainer: {
          color: {
            normal: themeTokens.colorScheme.surfaceContainerHighest,
          },
        },
        selectedContainer: {
          color: {
            normal: themeTokens.colorScheme.secondaryContainer,
          },
        },
        icon: {
          color: {
            normal: themeTokens.colorScheme.onSecondaryContainer,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        toggleIcon: {
          color: {
            normal: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        toggleSelectedIcon: {
          color: {
            normal: themeTokens.colorScheme.onSecondaryContainer,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        toggleStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onSecondaryContainer,
          },
        },
        toggleSelectedStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
      }),
    },
  }),
  outlined: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        selectedContainer: {
          color: {
            normal: themeTokens.colorScheme.inverseSurface,
            disabled: 'transparent',
          },
        },
        icon: {
          color: {
            normal: themeTokens.colorScheme.onSurfaceVariant,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        toggleIcon: {
          color: {
            normal: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        toggleSelectedIcon: {
          color: {
            normal: themeTokens.colorScheme.inverseOnSurface,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        toggleStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        toggleSelectedStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.inverseOnSurface,
          },
        },
        outline: {
          style: 'solid',
        },
      }),
    },
  }),
  danger: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: themeTokens.colorScheme.errorContainer,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        unselectedContainer: {
          color: {
            normal: themeTokens.colorScheme.surfaceContainerHighest,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        selectedContainer: {
          color: {
            normal: themeTokens.colorScheme.errorContainer,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        icon: {
          color: {
            normal: themeTokens.colorScheme.onErrorContainer,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        toggleIcon: {
          color: {
            normal: themeTokens.colorScheme.onErrorContainer,
          },
        },
        toggleSelectedIcon: {
          color: {
            normal: themeTokens.colorScheme.onErrorContainer,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onErrorContainer,
          },
        },
        toggleStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onErrorContainer,
          },
        },
        toggleSelectedStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.error,
          },
        },
      }),
    },
  }),
  snackbar: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          size: px(32),
        },
        icon: {
          color: {
            normal: themeTokens.colorScheme.inverseOnSurface,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        toggleIcon: {
          color: {
            normal: themeTokens.colorScheme.inverseOnSurface,
          },
        },
        toggleSelectedIcon: {
          color: {
            normal: themeTokens.colorScheme.inverseOnSurface,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.inverseOnSurface,
          },
        },
        toggleStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.inverseOnSurface,
          },
        },
        toggleSelectedStateLayer: {
          color: {
            hovered: themeTokens.colorScheme.inverseOnSurface,
          },
        },
      }),
    },
  }),
};
