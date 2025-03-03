import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IFabVariant } from './Fab.types';
import { Button } from '~/components/Button';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { responsiveContainerQuery } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './Fab.constants';

type IModifier = 'extended' | 'flat' | 'size';

const DENSITY = px(density({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    size: {
      sm: px(40),
      md: px(56),
      lg: px(96),
    },
    shape: {
      sm: px(themeTokens.shape.corner.md),
      md: px(themeTokens.shape.corner.lg),
      lg: px(themeTokens.shape.corner.xl),
    },
    color: 'unset',
    elevation: elevationLevelPreset[3],
  },
  icon: {
    size: {
      sm: px(24),
      md: px(24),
      lg: px(36),
    },
    labelSpace: px(space('$md')),
  },
  label: {
    color: 'unset',
    typography: themeTokens.typeScale.label.lg,
  },
});

const classNames = createStyles({
  root: {
    zIndex: themeTokens.zIndex.overlay,
    minWidth: 'unset',
    width: calc.add(tokens.container.size.md, DENSITY),
    height: calc.add(tokens.container.size.md, DENSITY),
    flexShrink: 0,

    vars: overrideTokens(Button.theme.tokens, {
      container: {
        color: {
          normal: tokens.container.color,
        },
        shape: calc.add(tokens.container.shape.md, calc.divide(DENSITY, 4)),
        elevation: {
          normal: tokens.container.elevation,
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
      icon: {
        size: tokens.icon.size.md,
        labelSpace: tokens.icon.labelSpace,
      },
      label: {
        color: {
          normal: tokens.label.color,
        },
        typography: tokens.label.typography,
      },
    }),
    '@container': {
      [responsiveContainerQuery({ size: 'compact' })]: {
        selectors: {
          [modifierSelector<IModifier>({ extended: false })]: {
            width: calc.add(tokens.container.size.sm, DENSITY),
            height: calc.add(tokens.container.size.sm, DENSITY),

            vars: overrideTokens(Button.theme.tokens, {
              container: {
                shape: calc.add(
                  tokens.container.shape.sm,
                  calc.divide(DENSITY, 4),
                ),
                leadingSpace: {
                  normal: px(space('$md')),
                  withStart: px(space('$sm')),
                },
                trailingSpace: {
                  normal: px(space('$md')),
                  withEnd: px(space('$sm')),
                },
              },
              icon: {
                size: tokens.icon.size.sm,
              },
            }),
          },
          [modifierSelector<IModifier>({ extended: true })]: {
            minWidth: tokens.container.size.md,
            width: 'auto',
          },
        },
      },
    },
    selectors: {
      [modifierSelector<IModifier>({ extended: false, size: 'sm' })]: {
        width: calc.add(tokens.container.size.sm, DENSITY),
        height: calc.add(tokens.container.size.sm, DENSITY),

        vars: overrideTokens(Button.theme.tokens, {
          container: {
            shape: calc.add(tokens.container.shape.sm, calc.divide(DENSITY, 4)),
          },
          icon: {
            size: tokens.icon.size.sm,
          },
        }),
      },
      [modifierSelector<IModifier>({ extended: false, size: 'lg' })]: {
        width: calc.add(tokens.container.size.lg, DENSITY),
        height: calc.add(tokens.container.size.lg, DENSITY),

        vars: overrideTokens(Button.theme.tokens, {
          container: {
            shape: calc.add(tokens.container.shape.lg, calc.divide(DENSITY, 4)),
          },
          icon: {
            size: tokens.icon.size.lg,
          },
        }),
      },
      [modifierSelector<IModifier>({ extended: true })]: {
        minWidth: tokens.container.size.md,
        width: 'auto',

        vars: overrideTokens(Button.theme.tokens, {
          container: {
            leadingSpace: {
              normal: px(space('$xl')),
              withStart: px(space('$lg')),
            },
            trailingSpace: {
              normal: px(space('$xl')),
              withEnd: px(space('$xl')),
            },
          },
        }),
      },
      [modifierSelector<IModifier>({ extended: true, size: 'sm' })]: {
        minWidth: tokens.container.size.sm,
      },
      [modifierSelector<IModifier>({ extended: true, size: 'lg' })]: {
        minWidth: tokens.container.size.lg,
      },
      [modifierSelector<IModifier>('flat')]: {
        vars: overrideTokens(Button.theme.tokens, {
          container: {
            elevation: {
              normal: elevationLevelPreset[0],
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
      vars: overrideTokens(tokens, {
        container: {
          color: themeTokens.colorScheme.surfaceContainerHigh,
        },
        label: {
          color: themeTokens.colorScheme.primary,
        },
      }),
    },
  }),
  primary: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          color: themeTokens.colorScheme.primaryContainer,
        },
        label: {
          color: themeTokens.colorScheme.onPrimaryContainer,
        },
      }),
    },
  }),
  secondary: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          color: themeTokens.colorScheme.secondaryContainer,
        },
        label: {
          color: themeTokens.colorScheme.onSecondaryContainer,
        },
      }),
    },
  }),
  tertiary: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          color: themeTokens.colorScheme.tertiaryContainer,
        },
        label: {
          color: themeTokens.colorScheme.onTertiaryContainer,
        },
      }),
    },
  }),
  branded: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          color: themeTokens.colorScheme.surfaceContainerHigh,
        },
        label: {
          color: themeTokens.colorScheme.primary,
        },
        icon: {
          size: {
            sm: px(36),
            md: px(36),
            lg: px(48),
          },
        },
      }),
    },
  }),
};
