import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IIconButtonVariant } from './IconButton.types';
import { Button } from '~/components/Button';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './IconButton.constants';

type IModifier = 'toggle' | 'selected' | 'disabled';

const DENSITY = px(density({ min: -4, max: 0 }));

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

    vars: overrideTokens(Button.theme.tokens, {
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
        minHeight: tokens.size,
      },
      label: {
        typography: {
          lineHeight: tokens.icon.size,
        },
      },
      icon: tokens.icon,
    }),

    selectors: {
      [modifierSelector<IModifier>('toggle')]: {
        vars: overrideTokens(Button.theme.tokens, {
          icon: tokens.icon$toggle,
        }),
      },
      [modifierSelector<IModifier>(['toggle', 'selected'])]: {
        vars: overrideTokens(Button.theme.tokens, {
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
        ...overrideTokens(tokens, {
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
        ...overrideTokens(Button.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.primary,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
        ...overrideTokens(tokens, {
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
        [modifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: overrideTokens(Button.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.primary,
              },
            },
          }),
        },
        [modifierSelector<IModifier>(['toggle', '!selected'])]: {
          vars: overrideTokens(Button.theme.tokens, {
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
      vars: overrideTokens(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onPrimary,
        },
      }),
    },
  }),
  filledTonal: createStyles({
    root: {
      vars: {
        ...overrideTokens(Button.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.secondaryContainer,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
        ...overrideTokens(tokens, {
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
        [modifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: {
            ...overrideTokens(Button.theme.tokens, {
              container: {
                color: {
                  normal: themeTokens.colorScheme.secondaryContainer,
                },
              },
            }),
          },
        },
        [modifierSelector<IModifier>(['toggle', '!selected'])]: {
          vars: overrideTokens(Button.theme.tokens, {
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
      vars: overrideTokens(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onSurfaceVariant,
        },
      }),
    },
  }),
  outlined: createStyles({
    root: {
      vars: {
        ...overrideTokens(PaperBase.theme.tokens, {
          outline: {
            style: 'solid',
            width: px(themeTokens.outline.width.xs),
          },
        }),
        ...overrideTokens(tokens, {
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
        [modifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: overrideTokens(Button.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.inverseSurface,
                disabled: 'transparent',
              },
            },
          }),
        },
        [modifierSelector<IModifier>(['toggle', 'selected', '!disabled'])]: {
          vars: overrideTokens(PaperBase.theme.tokens, {
            outline: {
              width: px(themeTokens.outline.width.none),
            },
          }),
        },
        [modifierSelector<IModifier>(['toggle', '!selected'])]: {
          vars: overrideTokens(Button.theme.tokens, {
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
      vars: overrideTokens(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onSurface,
        },
      }),
      selectors: {
        [modifierSelector<IModifier>(['toggle', 'selected'], root)]: {
          vars: overrideTokens(StateLayer.theme.tokens, {
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
        ...overrideTokens(Button.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.errorContainer,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
        ...overrideTokens(tokens, {
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
        [modifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: overrideTokens(Button.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.errorContainer,
              },
            },
          }),
        },
        [modifierSelector<IModifier>(['toggle', '!selected'])]: {
          vars: overrideTokens(Button.theme.tokens, {
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
      vars: overrideTokens(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onErrorContainer,
        },
      }),
    },
  }),
  snackbar: createStyles({
    root: {
      vars: overrideTokens(tokens, {
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
      vars: overrideTokens(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.inverseOnSurface,
        },
      }),
    },
  }),
};
