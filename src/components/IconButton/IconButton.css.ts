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
  container$selected: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
  },
  container$unselected: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
  },
  icon: {
    labelSpace: px(0),
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
  icon$toggle: {
    color: {
      normal: 'inherit',
      hovered: 'inherit',
      focused: 'inherit',
      pressed: 'inherit',
    },
  },
  icon$toggle$selected: {
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
  stateLayer$toggle: {
    color: {
      hovered: 'unset',
      pressed: 'unset',
    },
  },
  stateLayer$toggle$selected: {
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
      stateLayer: tokens.stateLayer,
      container: {
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
          stateLayer: tokens.stateLayer$toggle,
          container: tokens.container$unselected,
          icon: tokens.icon$toggle,
        }),
      },
      [getModifierSelector<IModifier>(['toggle', 'selected'])]: {
        vars: createTokensVars(Button.theme.tokens, {
          stateLayer: tokens.stateLayer$toggle$selected,
          container: tokens.container$selected,
          icon: tokens.icon$toggle$selected,
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
        icon$toggle: {
          color: {
            normal: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        icon$toggle$selected: {
          color: {
            normal: themeTokens.colorScheme.primary,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        stateLayer$toggle: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        stateLayer$toggle$selected: {
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
        container$unselected: {
          color: {
            normal: themeTokens.colorScheme.surfaceContainerHighest,
          },
        },
        container$selected: {
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
        icon$toggle: {
          color: {
            normal: themeTokens.colorScheme.primary,
          },
        },
        icon$toggle$selected: {
          color: {
            normal: themeTokens.colorScheme.onPrimary,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onPrimary,
          },
        },
        stateLayer$toggle: {
          color: {
            hovered: themeTokens.colorScheme.primary,
          },
        },
        stateLayer$toggle$selected: {
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
        container$unselected: {
          color: {
            normal: themeTokens.colorScheme.surfaceContainerHighest,
          },
        },
        container$selected: {
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
        icon$toggle: {
          color: {
            normal: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        icon$toggle$selected: {
          color: {
            normal: themeTokens.colorScheme.onSecondaryContainer,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        stateLayer$toggle: {
          color: {
            hovered: themeTokens.colorScheme.onSecondaryContainer,
          },
        },
        stateLayer$toggle$selected: {
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
        container$selected: {
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
        icon$toggle: {
          color: {
            normal: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        icon$toggle$selected: {
          color: {
            normal: themeTokens.colorScheme.inverseOnSurface,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        stateLayer$toggle: {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
          },
        },
        stateLayer$toggle$selected: {
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
        container$unselected: {
          color: {
            normal: themeTokens.colorScheme.surfaceContainerHighest,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        container$selected: {
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
        icon$toggle: {
          color: {
            normal: themeTokens.colorScheme.onErrorContainer,
          },
        },
        icon$toggle$selected: {
          color: {
            normal: themeTokens.colorScheme.onErrorContainer,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.onErrorContainer,
          },
        },
        stateLayer$toggle: {
          color: {
            hovered: themeTokens.colorScheme.onErrorContainer,
          },
        },
        stateLayer$toggle$selected: {
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
        icon$toggle: {
          color: {
            normal: themeTokens.colorScheme.inverseOnSurface,
          },
        },
        icon$toggle$selected: {
          color: {
            normal: themeTokens.colorScheme.inverseOnSurface,
          },
        },
        stateLayer: {
          color: {
            hovered: themeTokens.colorScheme.inverseOnSurface,
          },
        },
        stateLayer$toggle: {
          color: {
            hovered: themeTokens.colorScheme.inverseOnSurface,
          },
        },
        stateLayer$toggle$selected: {
          color: {
            hovered: themeTokens.colorScheme.inverseOnSurface,
          },
        },
      }),
    },
  }),
};
