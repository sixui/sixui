import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IFabVariant } from './Fab.types';
import { Button } from '~/components/Button';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './Fab.constants';

type IModifier = 'extended' | 'lowered';

const DENSITY = px(density({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
    width: calc.add(tokens.container.size, DENSITY),
    height: calc.add(tokens.container.size, DENSITY),

    vars: {
      ...overrideTokens(PaperBase.theme.tokens, {
        container: {
          shape: px(themeTokens.shape.corner.lg),
        },
      }),
      ...overrideTokens(Button.theme.tokens, {
        container: {
          elevation: {
            normal: elevationLevelPreset[3],
          },
          leadingSpace: {
            normal: px(0),
            withStart: px(0),
          },
          trailingSpace: {
            normal: px(0),
            withEnd: px(0),
          },
        },
        icon: tokens.icon,
        label: tokens.label,
      }),
    },
    selectors: {
      [modifierSelector<IModifier>('extended')]: {
        vars: {
          minWidth: tokens.container.size,
          width: 'auto',
          ...overrideTokens(Button.theme.tokens, {
            container: {
              leadingSpace: {
                normal: px(space(6)),
                withStart: px(space(4)),
              },
              trailingSpace: {
                normal: px(space(6)),
                withEnd: px(space(6)),
              },
            },
          }),
        },
      },
      [modifierSelector<IModifier>('lowered')]: {
        vars: overrideTokens(Button.theme.tokens, {
          container: {
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
    vars: overrideTokens(StateLayer.theme.tokens, {
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
        ...overrideTokens(Button.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.surfaceContainerHigh,
            },
          },
        }),
        ...overrideTokens(tokens, {
          label: {
            color: {
              normal: themeTokens.colorScheme.primary,
            },
          },
        }),
      },
      selectors: {
        [modifierSelector<IModifier>('lowered')]: {
          vars: overrideTokens(Button.theme.tokens, {
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
        ...overrideTokens(Button.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.primaryContainer,
            },
          },
        }),
        ...overrideTokens(tokens, {
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
        ...overrideTokens(Button.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.secondaryContainer,
            },
          },
        }),
        ...overrideTokens(tokens, {
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
        ...overrideTokens(Button.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.tertiaryContainer,
            },
          },
        }),
        ...overrideTokens(tokens, {
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
        ...overrideTokens(Button.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.surfaceContainerHigh,
            },
          },
        }),
        ...overrideTokens(tokens, {
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
        [modifierSelector<IModifier>('lowered')]: {
          vars: overrideTokens(Button.theme.tokens, {
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
