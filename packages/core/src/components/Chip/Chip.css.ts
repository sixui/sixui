import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IChipVariant } from './Chip.types';
import { Avatar } from '~/components/Avatar';
import { Button } from '~/components/Button';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './Chip.constants';

type IModifier =
  | IInteraction
  | 'non-interactive'
  | 'elevated'
  | 'selected'
  | 'avatar'
  | 'disabled';

const DENSITY = px(density({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  leadingSpace: {
    normal: px(space('$lg')),
    withStart: px(space('$sm')),
  },
  trailingSpace: {
    normal: px(space('$lg')),
    withEnd: px(space('$sm')),
  },
  height: px(32),
  icon: {
    size: px(18),
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
    },
  },
  icon$interactive: {
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
    },
  },
  icon$selected: {
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
    },
  },
  icon$avatar: {
    size: px(24),
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
    },
  },
  label: {
    typography: themeTokens.typeScale.label.lg,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      focused: themeTokens.colorScheme.onSurface,
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  label$selected: {
    color: {
      normal: 'inherit',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: 'inherit',
    },
  },
  avatar: {
    size: px(24),
    shape: px(themeTokens.shape.corner.full),
  },
});

const classNames = createStyles({
  root: {
    minWidth: 'unset',
    height: calc.add(tokens.height, DENSITY),

    vars: overrideTokens(Button.theme.tokens, {
      container: {
        shape: px(themeTokens.shape.corner.sm),
        leadingSpace: {
          normal: tokens.leadingSpace.normal,
          withStart: tokens.leadingSpace.withStart,
        },
        trailingSpace: {
          normal: tokens.trailingSpace.normal,
          withEnd: tokens.trailingSpace.withEnd,
        },
        minHeight: tokens.height,
        color: {
          normal: themeTokens.colorScheme.surfaceContainerLow,
          disabled: 'unset',
        },
      },
      icon: tokens.icon,
      label: tokens.label,
    }),
    selectors: {
      [modifierSelector<IModifier>({
        'non-interactive': false,
      })]: {
        vars: overrideTokens(Button.theme.tokens, {
          icon: tokens.icon$interactive,
        }),
      },
      [modifierSelector<IModifier>({
        elevated: false,
      })]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          outline: {
            width: px(themeTokens.outline.width.xs),
          },
        }),
      },
      [modifierSelector<IModifier>({
        elevated: true,
      })]: {
        vars: overrideTokens(Button.theme.tokens, {
          container: {
            color: {
              disabled: themeTokens.colorScheme.onSurface,
            },
            elevation: {
              normal: elevationLevelPreset[1],
              focused: elevationLevelPreset[1],
              hovered: elevationLevelPreset[2],
              pressed: elevationLevelPreset[1],
              disabled: elevationLevelPreset[0],
            },
          },
        }),
      },
      [modifierSelector<IModifier>({
        selected: true,
      })]: {
        vars: {
          ...overrideTokens(Button.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.secondaryContainer,
                disabled: themeTokens.colorScheme.onSurface,
              },
            },
            icon: tokens.icon$selected,
            label: {
              color: {
                normal: fallbackVar(
                  tokens.label$selected.color.normal,
                  tokens.label.color.normal,
                ),
                focused: fallbackVar(
                  tokens.label$selected.color.focused,
                  tokens.label.color.focused,
                ),
                hovered: fallbackVar(
                  tokens.label$selected.color.hovered,
                  tokens.label.color.hovered,
                ),
                pressed: fallbackVar(
                  tokens.label$selected.color.pressed,
                  tokens.label.color.pressed,
                ),
                disabled: fallbackVar(
                  tokens.label$selected.color.disabled,
                  tokens.label.color.disabled,
                ),
              },
            },
          }),
        },
      },
      [modifierSelector<IModifier>({
        avatar: true,
      })]: {
        vars: overrideTokens(Button.theme.tokens, {
          container: {
            shape: px(themeTokens.shape.corner.full),
            leadingSpace: {
              withStart: px(space('$xs')),
            },
          },
          icon: tokens.icon$avatar,
        }),
      },
      [modifierSelector<IModifier>({
        disabled: true,
      })]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          outline: {
            opacity: themeTokens.state.opacity.disabled,
          },
        }),
      },
    },
  },
  avatar: ({ root }) => ({
    vars: overrideTokens(Avatar.theme.tokens, {
      size: tokens.icon.size,
    }),

    selectors: {
      [modifierSelector<IModifier>({ avatar: true }, root)]: {
        vars: overrideTokens(Avatar.theme.tokens, {
          size: px(24),
        }),
      },
      [modifierSelector<IModifier>({ avatar: false }, root)]: {
        vars: {
          [themeTokens.density.interval]: '0',
        },
      },
    },
  }),
  actionButton: {
    zIndex: 1,
    marginLeft: px(-12),
    marginRight: px(-12),

    vars: overrideTokens(Button.theme.tokens, {
      container: {
        color: {
          normal: 'transparent',
          disabled: 'transparent',
        },
      },
    }),
  },
});

export type IChipThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IChipVariant;
}>;

export const chipTheme = componentThemeFactory<IChipThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
