import { createTheme, fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IChipVariant } from './Chip.types';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier =
  | IInteraction
  | 'elevated'
  | 'selected'
  | 'loading'
  | 'interactive'
  | 'avatar';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  leadingSpace: {
    normal: px(space(4)),
    withStartSlot: px(space(2)),
    withEndSlot: px(space(4)),
  },
  trailingSpace: {
    normal: px(space(4)),
    withStartSlot: px(space(4)),
    withEndSlot: px(space(2)),
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
    vars: {
      ...createTokensVars(PaperBase.theme.tokens, {
        container: {
          color: {
            normal: themeTokens.colorScheme.surfaceContainerLow,
          },
          shape: px(themeTokens.shape.corner.sm),
        },
      }),
      ...createTokensVars(Button.theme.tokens, {
        leadingSpace: tokens.leadingSpace,
        trailingSpace: tokens.trailingSpace,
        height: tokens.height,
        icon: tokens.icon,
        label: tokens.label,
      }),
    },

    minWidth: 'unset',
    height: calc.add(tokens.height, DENSITY),
    transitionProperty: 'border-radius',
    transitionDuration: themeTokens.motion.duration.medium.$4,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,

    selectors: {
      [getModifierSelector<IModifier>({
        interactive: true,
      })]: {
        vars: createTokensVars(Button.theme.tokens, {
          icon: tokens.icon$interactive,
        }),
      },
      [getModifierSelector<IModifier>({
        elevated: false,
      })]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          outline: {
            width: {
              normal: px(themeTokens.outline.width.xs),
            },
          },
        }),
      },
      [getModifierSelector<IModifier>({
        elevated: true,
      })]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            elevation: {
              normal: elevationLevelPreset[1],
              focused: elevationLevelPreset[1],
              hovered: elevationLevelPreset[2],
              pressed: elevationLevelPreset[1],
              disabled: elevationLevelPreset[0],
            },
            color: {
              normal: themeTokens.colorScheme.surfaceContainerLow,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
      },
      [getModifierSelector<IModifier>({
        selected: true,
      })]: {
        vars: {
          ...createTokensVars(PaperBase.theme.tokens, {
            container: {
              color: {
                normal: themeTokens.colorScheme.secondaryContainer,
                disabled: themeTokens.colorScheme.onSurface,
              },
            },
          }),
          ...createTokensVars(Button.theme.tokens, {
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
      [getModifierSelector<IModifier>({
        avatar: true,
      })]: {
        vars: {
          ...createTokensVars(PaperBase.theme.tokens, {
            container: {
              shape: px(themeTokens.shape.corner.full),
            },
          }),
          ...createTokensVars(Button.theme.tokens, {
            leadingSpace: {
              withStartSlot: px(space(1)),
            },
            icon: tokens.icon$avatar,
          }),
        },
      },
    },
  },
  avatar: ({ root }) => ({
    vars: createTokensVars(Avatar.theme.tokens, {
      size: tokens.icon.size,
    }),

    selectors: {
      [getModifierSelector<IModifier>({ avatar: true }, root)]: {
        vars: createTokensVars(Avatar.theme.tokens, {
          size: px(24),
        }),
      },
      [getModifierSelector<IModifier>({ avatar: false }, root)]: {
        vars: {
          [themeTokens.density.interval]: '0',
        },
      },
    },
  }),
  deleteButton: {
    zIndex: 1,
    marginLeft: px(-12),
    marginRight: px(-12),
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
