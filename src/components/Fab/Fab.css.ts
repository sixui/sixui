import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IFabVariant } from './Fab.types';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Button } from '../Button';
import { PaperBase } from '../PaperBase';
import { StateLayer } from '../StateLayer';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'extended' | 'lowered';

const [tokensClassName, tokens] = createTheme({
  container: {
    size: px(56),
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

    vars: {
      ...createTokensVars(PaperBase.theme.tokens, {
        container: {
          color: {
            normal: 'unset',
          },
          shape: px(themeTokens.shape.corner.lg),
          elevation: {
            normal: elevationLevelPreset[3],
          },
        },
      }),
      ...createTokensVars(Button.theme.tokens, {
        leadingSpace: {
          normal: '0',
          withStartSlot: '0',
          withEndSlot: '0',
        },
        trailingSpace: {
          normal: '0',
          withStartSlot: '0',
          withEndSlot: '0',
        },
        icon: tokens.icon,
        label: tokens.label,
      }),
    },
    selectors: {
      [getModifierSelector<IModifier>('extended')]: {
        vars: {
          minWidth: tokens.container.size,
          width: 'auto',
          ...createTokensVars(Button.theme.tokens, {
            leadingSpace: {
              normal: px(space(6)),
              withStartSlot: px(space(4)),
            },
            trailingSpace: {
              normal: px(space(6)),
              withStartSlot: px(space(6)),
            },
          }),
        },
      },
      [getModifierSelector<IModifier>('lowered')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: 'unset',
            },
            elevation: {
              normal: elevationLevelPreset[1],
              focused: elevationLevelPreset[1],
              hovered: elevationLevelPreset[2],
              pressed: elevationLevelPreset[1],
            },
          },
        }),
      },
    },
  },
  stateLayer: {
    vars: createTokensVars(StateLayer.theme.tokens, {
      color: {
        hovered: themeTokens.colorScheme.onSurface,
        pressed: themeTokens.colorScheme.onSurface,
      },
      opacity: {
        hovered: themeTokens.state.stateLayerOpacity.hovered,
        pressed: themeTokens.state.stateLayerOpacity.pressed,
      },
    }),
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
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.surfaceContainerHigh,
            },
          },
        }),
        ...createTokensVars(tokens, {
          label: {
            color: {
              normal: themeTokens.colorScheme.primary,
            },
          },
        }),
      },
      selectors: {
        [getModifierSelector<IModifier>('lowered')]: {
          vars: createTokensVars(PaperBase.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.surfaceContainerLow,
              },
            },
          }),
        },
      },
    },
  }),
  primary: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.primaryContainer,
            },
          },
        }),
        ...createTokensVars(tokens, {
          label: {
            color: {
              normal: themeTokens.colorScheme.onPrimaryContainer,
            },
          },
        }),
      },
    },
  }),
  secondary: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.secondaryContainer,
            },
          },
        }),
        ...createTokensVars(tokens, {
          label: {
            color: {
              normal: themeTokens.colorScheme.onSecondaryContainer,
            },
          },
        }),
      },
    },
  }),
  tertiary: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.tertiaryContainer,
            },
          },
        }),
        ...createTokensVars(tokens, {
          label: {
            color: {
              normal: themeTokens.colorScheme.onTertiaryContainer,
            },
          },
        }),
      },
    },
  }),
  branded: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.surfaceContainerHigh,
            },
          },
        }),
        ...createTokensVars(tokens, {
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
      selectors: {
        [getModifierSelector<IModifier>('lowered')]: {
          vars: createTokensVars(PaperBase.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.surfaceContainerLow,
              },
            },
          }),
        },
      },
    },
  }),
};
