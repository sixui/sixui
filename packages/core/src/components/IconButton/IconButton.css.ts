import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IIconButtonVariant } from './IconButton.types';
import { Button } from '~/components/Button';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/ThemeProvider';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { COMPONENT_NAME } from './IconButton.constants';

type IModifier = 'toggle' | 'selected' | 'disabled';

const DENSITY = px(getDensity({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  size: px(40),
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
});

const classNames = createStyles({
  root: {
    minWidth: 'unset',
    width: calc.add(tokens.size, DENSITY),
    flexShrink: 0,

    vars: createTokensVars(Button.theme.tokens, {
      container: {
        shape: px(themeTokens.shape.corner.circle),
        color: {
          normal: 'transparent',
          disabled: 'transparent',
        },
        leadingSpace: {
          normal: px(0),
          withStart: px(0),
        },
        trailingSpace: {
          normal: px(0),
          withEnd: px(0),
        },
        minWidth: tokens.size,
        height: tokens.size,
      },
      label: {
        typography: {
          lineHeight: tokens.icon.size,
        },
      },
      icon: tokens.icon,
    }),

    selectors: {
      [getModifierSelector<IModifier>('toggle')]: {
        vars: createTokensVars(Button.theme.tokens, {
          icon: tokens.icon$toggle,
        }),
      },
      [getModifierSelector<IModifier>(['toggle', 'selected'])]: {
        vars: createTokensVars(Button.theme.tokens, {
          icon: tokens.icon$toggle$selected,
        }),
      },
    },
  },
  stateLayer: {},
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
      vars: {
        ...createTokensVars(tokens, {
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
        }),
      },
    },
  }),
  filled: createStyles({
    root: {
      vars: {
        ...createTokensVars(Button.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.primary,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
        ...createTokensVars(tokens, {
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
        }),
      },
      selectors: {
        [getModifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: createTokensVars(Button.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.primary,
              },
            },
          }),
        },
        [getModifierSelector<IModifier>(['toggle', '!selected'])]: {
          vars: createTokensVars(Button.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.surfaceContainerHighest,
              },
            },
          }),
        },
      },
    },
    stateLayer: {
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onPrimary,
        },
      }),
    },
  }),
  filledTonal: createStyles({
    root: {
      vars: {
        ...createTokensVars(Button.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.secondaryContainer,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
        ...createTokensVars(tokens, {
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
        }),
      },
      selectors: {
        [getModifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: {
            ...createTokensVars(Button.theme.tokens, {
              container: {
                color: {
                  normal: themeTokens.colorScheme.secondaryContainer,
                },
              },
            }),
          },
        },
        [getModifierSelector<IModifier>(['toggle', '!selected'])]: {
          vars: createTokensVars(Button.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.surfaceContainerHighest,
              },
            },
          }),
        },
      },
    },
    stateLayer: {
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onSurfaceVariant,
        },
      }),
    },
  }),
  outlined: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          outline: {
            style: 'solid',
            width: px(themeTokens.outline.width.xs),
          },
        }),
        ...createTokensVars(tokens, {
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
        }),
      },
      selectors: {
        [getModifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: createTokensVars(Button.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.inverseSurface,
                disabled: 'transparent',
              },
            },
          }),
        },
        [getModifierSelector<IModifier>(['toggle', 'selected', '!disabled'])]: {
          vars: createTokensVars(PaperBase.theme.tokens, {
            outline: {
              width: px(themeTokens.outline.width.none),
            },
          }),
        },
        [getModifierSelector<IModifier>(['toggle', '!selected'])]: {
          vars: createTokensVars(Button.theme.tokens, {
            container: {
              color: {
                normal: 'inherit',
              },
            },
          }),
        },
      },
    },
    stateLayer: ({ root }) => ({
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onSurface,
        },
      }),
      selectors: {
        [getModifierSelector<IModifier>(['toggle', 'selected'], root)]: {
          vars: createTokensVars(StateLayer.theme.tokens, {
            color: {
              hovered: themeTokens.colorScheme.inverseOnSurface,
            },
          }),
        },
      },
    }),
  }),
  danger: createStyles({
    root: {
      vars: {
        ...createTokensVars(Button.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.errorContainer,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
        ...createTokensVars(tokens, {
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
        }),
      },
      selectors: {
        [getModifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: createTokensVars(Button.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.errorContainer,
              },
            },
          }),
        },
        [getModifierSelector<IModifier>(['toggle', '!selected'])]: {
          vars: createTokensVars(Button.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.surfaceContainerHighest,
              },
            },
          }),
        },
      },
    },
    stateLayer: {
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onErrorContainer,
        },
      }),
    },
  }),
  snackbar: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        size: px(32),
        icon: {
          color: {
            normal: themeTokens.colorScheme.inverseOnSurface,
            disabled: themeTokens.colorScheme.inverseOnSurface,
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
      }),
    },
    stateLayer: {
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.inverseOnSurface,
        },
      }),
    },
  }),
};
