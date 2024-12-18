import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IIconButtonVariant } from './IconButton.types';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Button } from '../Button';
import { PaperBase } from '../PaperBase';
import { StateLayer } from '../StateLayer';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'toggle' | 'selected';

const [tokensClassName, tokens] = createTheme({
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
    width: tokens.size,
    flexShrink: 0,

    vars: {
      ...createTokensVars(PaperBase.theme.tokens, {
        container: {
          shape: px(themeTokens.shape.corner.full),
          color: {
            disabled: 'inherit',
          },
        },
      }),
      ...createTokensVars(Button.theme.tokens, {
        leadingSpace: {
          normal: '0px',
          withStartSlot: '0px',
          withEndSlot: '0px',
        },
        trailingSpace: {
          normal: '0px',
          withStartSlot: '0px',
          withEndSlot: '0px',
        },
        minWidth: tokens.size,
        height: tokens.size,
        label: {
          typography: {
            lineHeight: tokens.icon.size,
          },
        },
        icon: tokens.icon,
      }),
    },

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
        ...createTokensVars(StateLayer.theme.tokens, {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
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
              normal: themeTokens.colorScheme.primary,
            },
          },
        }),
      },
      selectors: {
        [getModifierSelector<IModifier>('toggle')]: {
          vars: createTokensVars(StateLayer.theme.tokens, {
            color: {
              hovered: themeTokens.colorScheme.onSurfaceVariant,
            },
          }),
        },
        [getModifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: createTokensVars(StateLayer.theme.tokens, {
            color: {
              hovered: themeTokens.colorScheme.onSurfaceVariant,
            },
          }),
        },
      },
    },
  }),
  filled: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.primary,
            },
          },
        }),
        ...createTokensVars(StateLayer.theme.tokens, {
          color: {
            hovered: themeTokens.colorScheme.onPrimary,
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
        [getModifierSelector<IModifier>('toggle')]: {
          vars: createTokensVars(StateLayer.theme.tokens, {
            color: {
              hovered: themeTokens.colorScheme.primary,
            },
          }),
        },
        [getModifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: {
            ...createTokensVars(PaperBase.theme.tokens, {
              container: {
                color: {
                  normal: themeTokens.colorScheme.primary,
                },
              },
            }),
            ...createTokensVars(StateLayer.theme.tokens, {
              color: {
                hovered: themeTokens.colorScheme.onPrimary,
              },
            }),
          },
        },
        [getModifierSelector<IModifier>(['toggle', '!selected'])]: {
          vars: createTokensVars(PaperBase.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.surfaceContainerHighest,
              },
            },
          }),
        },
      },
    },
  }),
  filledTonal: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.secondaryContainer,
            },
          },
        }),
        ...createTokensVars(StateLayer.theme.tokens, {
          color: {
            hovered: themeTokens.colorScheme.onSurfaceVariant,
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
        [getModifierSelector<IModifier>('toggle')]: {
          vars: createTokensVars(StateLayer.theme.tokens, {
            color: {
              hovered: themeTokens.colorScheme.onSecondaryContainer,
            },
          }),
        },
        [getModifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: {
            ...createTokensVars(PaperBase.theme.tokens, {
              container: {
                color: {
                  normal: themeTokens.colorScheme.secondaryContainer,
                },
              },
            }),
            ...createTokensVars(StateLayer.theme.tokens, {
              color: {
                hovered: themeTokens.colorScheme.onSurfaceVariant,
              },
            }),
          },
        },
        [getModifierSelector<IModifier>(['toggle', '!selected'])]: {
          vars: createTokensVars(PaperBase.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.surfaceContainerHighest,
              },
            },
          }),
        },
      },
    },
  }),
  outlined: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          outline: {
            style: 'solid',
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
        [getModifierSelector<IModifier>('toggle')]: {
          vars: createTokensVars(StateLayer.theme.tokens, {
            color: {
              hovered: themeTokens.colorScheme.onSurfaceVariant,
            },
          }),
        },
        [getModifierSelector<IModifier>(['toggle', 'selected'])]: {
          vars: {
            ...createTokensVars(PaperBase.theme.tokens, {
              container: {
                color: {
                  normal: themeTokens.colorScheme.inverseSurface,
                  disabled: 'transparent',
                },
              },
              outline: {
                style: 'unset',
              },
            }),
            ...createTokensVars(StateLayer.theme.tokens, {
              color: {
                hovered: themeTokens.colorScheme.inverseOnSurface,
              },
            }),
          },
        },
        [getModifierSelector<IModifier>(['toggle', '!selected'])]: {
          vars: createTokensVars(PaperBase.theme.tokens, {
            container: {
              color: {
                normal: 'inherit',
              },
            },
          }),
        },
      },
    },
  }),
  // danger: createStyles({
  //   root: {
  //     vars: createTokensVars(tokens, {
  //       container: {
  //         color: {
  //           normal: themeTokens.colorScheme.errorContainer,
  //           disabled: themeTokens.colorScheme.onSurface,
  //         },
  //       },
  //       container$unselected: {
  //         color: {
  //           normal: themeTokens.colorScheme.surfaceContainerHighest,
  //           disabled: themeTokens.colorScheme.onSurface,
  //         },
  //       },
  //       container$selected: {
  //         color: {
  //           normal: themeTokens.colorScheme.errorContainer,
  //           disabled: themeTokens.colorScheme.onSurface,
  //         },
  //       },
  //       icon: {
  //         color: {
  //           normal: themeTokens.colorScheme.onErrorContainer,
  //           disabled: themeTokens.colorScheme.onSurface,
  //         },
  //       },
  //       icon$toggle: {
  //         color: {
  //           normal: themeTokens.colorScheme.onErrorContainer,
  //         },
  //       },
  //       icon$toggle$selected: {
  //         color: {
  //           normal: themeTokens.colorScheme.onErrorContainer,
  //         },
  //       },
  //       stateLayer: {
  //         color: {
  //           hovered: themeTokens.colorScheme.onErrorContainer,
  //         },
  //       },
  //       stateLayer$toggle: {
  //         color: {
  //           hovered: themeTokens.colorScheme.onErrorContainer,
  //         },
  //       },
  //       stateLayer$toggle$selected: {
  //         color: {
  //           hovered: themeTokens.colorScheme.error,
  //         },
  //       },
  //     }),
  //   },
  // }),
  // snackbar: createStyles({
  //   root: {
  //     vars: createTokensVars(tokens, {
  //       container: {
  //         size: px(32),
  //       },
  //       icon: {
  //         color: {
  //           normal: themeTokens.colorScheme.inverseOnSurface,
  //           disabled: themeTokens.colorScheme.onSurface,
  //         },
  //       },
  //       icon$toggle: {
  //         color: {
  //           normal: themeTokens.colorScheme.inverseOnSurface,
  //         },
  //       },
  //       icon$toggle$selected: {
  //         color: {
  //           normal: themeTokens.colorScheme.inverseOnSurface,
  //         },
  //       },
  //       stateLayer: {
  //         color: {
  //           hovered: themeTokens.colorScheme.inverseOnSurface,
  //         },
  //       },
  //       stateLayer$toggle: {
  //         color: {
  //           hovered: themeTokens.colorScheme.inverseOnSurface,
  //         },
  //       },
  //       stateLayer$toggle$selected: {
  //         color: {
  //           hovered: themeTokens.colorScheme.inverseOnSurface,
  //         },
  //       },
  //     }),
  //   },
  // }),
};
