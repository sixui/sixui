import { createTheme, fallbackVar, keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IButtonVariant } from './Button.types';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { StateLayer } from '../StateLayer';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'loading'
  | 'with-leading-slot'
  | 'with-trailing-slot'
  | 'icon-animation';

const DENSITY = px(getDensity({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  leadingSpace: {
    normal: px(space(6)),
    withStartSlot: px(space(4)),
    withEndSlot: px(space(6)),
  },
  trailingSpace: {
    normal: px(space(6)),
    withStartSlot: px(space(6)),
    withEndSlot: px(space(4)),
  },
  height: px(40),
  minWidth: px(64),
  label: {
    typography: themeTokens.typeScale.label.lg,
    color: {
      normal: 'inherit',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  icon: {
    size: px(18),
    labelSpace: px(space(2)),
    color: {
      normal: 'inherit',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: 'inherit',
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const halfSpinKeyframes = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(180deg)' },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        shape: px(themeTokens.shape.corner.full),
      },
    }),

    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    position: 'relative',
    ...getTypographyStyles(tokens.label.typography),
    // Override vertical-align with shortest value "top". Vertical-align's
    // default "baseline" value causes buttons to be misaligned next to each
    // other if one button has an icon and the other does not.
    verticalAlign: 'top',

    paddingInlineStart: tokens.leadingSpace.normal,
    paddingInlineEnd: tokens.trailingSpace.normal,
    height: calc.add(tokens.height, DENSITY),
    // Add extra space between label and the edge for if the label text wraps.
    // The padding added should be relative to the height of the container and
    // the height of its content on a single line (label or icon, whichever is
    // bigger).
    paddingBlock: calc.divide(
      calc.subtract(tokens.height, tokens.label.typography.lineHeight),
      2,
    ),
    minWidth: calc.subtract(
      tokens.minWidth,
      tokens.leadingSpace.normal,
      tokens.trailingSpace.normal,
    ),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        cursor: 'default',
      },
      [getModifierSelector<IModifier>('with-leading-slot')]: {
        paddingInlineStart: tokens.leadingSpace.withStartSlot,
        paddingInlineEnd: tokens.trailingSpace.withStartSlot,
      },
      [getModifierSelector<IModifier>('with-trailing-slot')]: {
        paddingInlineStart: tokens.leadingSpace.withEndSlot,
        paddingInlineEnd: tokens.trailingSpace.withEndSlot,
      },
      [getModifierSelector<IModifier>([
        'with-leading-slot',
        'with-trailing-slot',
      ])]: {
        paddingInlineStart: tokens.leadingSpace.withStartSlot,
        paddingInlineEnd: tokens.trailingSpace.withEndSlot,
      },
    },
  },
  label: ({ root }) => ({
    position: 'relative',
    flexGrow: 1,
    // Long labels are cut off with ellipsis by default. `text-overflow` and
    // `text-wrap` can customize this.
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textWrap: 'nowrap',
    color: tokens.label.color.normal,

    selectors: {
      [getModifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.label.color.focused,
          tokens.label.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.label.color.hovered,
          tokens.label.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.label.color.pressed,
          tokens.label.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: fallbackVar(
          tokens.label.color.disabled,
          tokens.label.color.normal,
        ),
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
  icon: ({ root }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    writingMode: 'horizontal-tb',
    flexShrink: 0,
    fontSize: tokens.icon.size,
    inlineSize: tokens.icon.size,
    blockSize: tokens.icon.size,

    selectors: {
      [getModifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.icon.color.focused,
          tokens.icon.color.normal,
          tokens.label.color.focused,
          tokens.label.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.icon.color.hovered,
          tokens.icon.color.normal,
          tokens.label.color.hovered,
          tokens.label.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.icon.color.pressed,
          tokens.icon.color.normal,
          tokens.label.color.pressed,
          tokens.label.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: fallbackVar(
          tokens.icon.color.disabled,
          tokens.icon.color.normal,
          tokens.label.color.disabled,
          tokens.label.color.normal,
        ),
        opacity: tokens.icon.opacity.disabled,
      },
      [getModifierSelector<IModifier>({ 'icon-animation': 'halfSpin' }, root)]:
        {
          animationName: halfSpinKeyframes,
          animationDuration: themeTokens.motion.duration.long.$2,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        },
    },
  }),
  slot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  slot$start: {
    marginInlineEnd: tokens.icon.labelSpace,
  },
  slot$end: {
    marginInlineStart: tokens.icon.labelSpace,
  },
  slot$icon: {
    color: fallbackVar(tokens.icon.color.normal, tokens.label.color.normal),
    width: tokens.icon.size,
    opacity: 1,

    transitionProperty: 'opacity, width',
    transitionDuration: themeTokens.motion.duration.medium.$4,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,
  },
  slot$icon$collapsed: {
    marginInlineStart: 0,
    marginInlineEnd: 0,
    width: 0,
    opacity: 0,

    transitionProperty: 'opacity, width',
    transitionDuration: themeTokens.motion.duration.short.$2,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
  },
  overlay: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    justifyContent: 'center',
    paddingInlineStart: tokens.leadingSpace.normal,
    paddingInlineEnd: tokens.trailingSpace.normal,
  },
  invisible: {
    visibility: 'hidden',
  },
  stateLayer: {},
});

export type IButtonThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IButtonVariant;
}>;

export const buttonTheme = componentThemeFactory<IButtonThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const buttonThemeVariants = {
  elevated: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.surfaceContainerLow,
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
        ...createTokensVars(tokens, {
          label: {
            color: {
              normal: themeTokens.colorScheme.primary,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
      },
    },
    stateLayer: {
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.primary,
          pressed: themeTokens.colorScheme.primary,
        },
      }),
    },
  }),
  filled: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.primary,
              disabled: themeTokens.colorScheme.onSurface,
            },
            elevation: {
              hovered: elevationLevelPreset[1],
            },
          },
        }),
        ...createTokensVars(tokens, {
          label: {
            color: {
              normal: themeTokens.colorScheme.onPrimary,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
      },
    },
    stateLayer: {
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onPrimary,
          pressed: themeTokens.colorScheme.onPrimary,
        },
      }),
    },
  }),
  filledTonal: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.secondaryContainer,
              disabled: themeTokens.colorScheme.onSurface,
            },
            elevation: {
              hovered: elevationLevelPreset[1],
            },
          },
        }),
        ...createTokensVars(tokens, {
          label: {
            color: {
              normal: themeTokens.colorScheme.onSecondaryContainer,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
      },
    },
    stateLayer: {
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onSecondaryContainer,
          pressed: themeTokens.colorScheme.onSecondaryContainer,
        },
      }),
    },
  }),
  outlined: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          outline: {
            width: {
              normal: px(themeTokens.outline.width.xs),
            },
          },
        }),
        ...createTokensVars(tokens, {
          label: {
            color: {
              normal: themeTokens.colorScheme.primary,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
      },
    },
    stateLayer: {
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.primary,
          pressed: themeTokens.colorScheme.primary,
        },
      }),
    },
  }),
  text: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        leadingSpace: {
          normal: px(space(3)),
          withStartSlot: px(space(3)),
          withEndSlot: px(space(4)),
        },
        trailingSpace: {
          normal: px(space(3)),
          withStartSlot: px(space(4)),
          withEndSlot: px(space(3)),
        },
        label: {
          color: {
            normal: themeTokens.colorScheme.primary,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
      }),
    },
    stateLayer: {
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.primary,
          pressed: themeTokens.colorScheme.primary,
        },
      }),
    },
  }),
  danger: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.errorContainer,
              disabled: themeTokens.colorScheme.onSurface,
            },
            elevation: {
              hovered: elevationLevelPreset[1],
            },
          },
        }),
        ...createTokensVars(tokens, {
          label: {
            color: {
              normal: themeTokens.colorScheme.onErrorContainer,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
        }),
      },
    },
    stateLayer: {
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onErrorContainer,
          pressed: themeTokens.colorScheme.onErrorContainer,
        },
      }),
    },
  }),
  snackbar: createStyles({
    root: {
      vars: {
        ...createTokensVars(PaperBase.theme.tokens, {
          container: {
            shape: px(themeTokens.shape.corner.xs),
          },
        }),
        ...createTokensVars(tokens, {
          leadingSpace: {
            normal: px(space(4)),
            withStartSlot: px(space(3)),
            withEndSlot: px(space(4)),
          },
          trailingSpace: {
            normal: px(space(4)),
            withStartSlot: px(space(4)),
            withEndSlot: px(space(3)),
          },
          height: px(32),
          icon: {
            color: {
              normal: themeTokens.colorScheme.inversePrimary,
            },
          },
          label: {
            color: {
              normal: themeTokens.colorScheme.inversePrimary,
            },
          },
        }),
      },
    },
    stateLayer: {
      vars: createTokensVars(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.inversePrimary,
          pressed: themeTokens.colorScheme.inversePrimary,
        },
      }),
    },
  }),
};
