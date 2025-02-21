import { fallbackVar, keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IButtonVariant } from './Button.types';
import { ButtonBase } from '~/components/ButtonBase';
import { PaperBase } from '~/components/PaperBase';
import { Slot } from '~/components/Slot';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { em } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './Button.constants';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'loading'
  | 'with-children'
  | 'with-start'
  | 'with-end'
  | 'icon-animation';

const DENSITY = px(density({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.full),
    minHeight: px(40),
    minWidth: px(64),
    leadingSpace: {
      normal: px(space(6)),
      withStart: px(space(4)),
    },
    trailingSpace: {
      normal: px(space(6)),
      withEnd: px(space(4)),
    },
    color: {
      normal: 'unset',
      focused: 'unset',
      hovered: 'unset',
      pressed: 'unset',
      disabled: themeTokens.colorScheme.onSurface,
    },
    elevation: {
      normal: 'unset',
      focused: 'unset',
      hovered: 'unset',
      pressed: 'unset',
      disabled: 'unset',
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  outline: {
    color: {
      normal: themeTokens.colorScheme.outline,
      focused: 'unset',
      hovered: 'unset',
      pressed: 'unset',
      disabled: themeTokens.colorScheme.outline,
    },
    width: {
      normal: px(themeTokens.outline.width.none),
      focused: 'unset',
      hovered: 'unset',
      pressed: 'unset',
      disabled: px(themeTokens.outline.width.none),
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
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
    vars: {
      ...overrideTokens(ButtonBase.theme.tokens, {
        container: {
          shape: tokens.container.shape,
        },
      }),
      ...overrideTokens(PaperBase.theme.tokens, {
        container: {
          color: tokens.container.color.normal,
          elevation: tokens.container.elevation.normal,
          shape: tokens.container.shape,
        },
        outline: {
          color: tokens.outline.color.normal,
          width: tokens.outline.width.normal,
        },
      }),
    },

    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    position: 'relative',
    ...typography(tokens.label.typography),
    // Override vertical-align with shortest value "top". Vertical-align's
    // default "baseline" value causes buttons to be misaligned next to each
    // other if one button has an icon and the other does not.
    verticalAlign: 'top',

    transitionProperty: 'border-radius',
    transitionDuration: themeTokens.motion.duration.short2,
    transitionTimingFunction: themeTokens.motion.easing.linear,

    paddingLeft: tokens.container.leadingSpace.normal,
    paddingRight: tokens.container.trailingSpace.normal,
    minHeight: calc.add(tokens.container.minHeight, DENSITY),
    // Add extra space between label and the edge for if the label text wraps.
    // The padding added should be relative to the height of the container and
    // the height of its content on a single line (label or icon, whichever is
    // bigger).
    paddingBlock: calc.add(
      calc.divide(
        calc.subtract(
          tokens.container.minHeight,
          tokens.label.typography.lineHeight,
        ),
        2,
      ),
      DENSITY,
    ),
    minWidth: calc.subtract(
      tokens.container.minWidth,
      tokens.container.leadingSpace.normal,
      tokens.container.trailingSpace.normal,
    ),

    selectors: {
      [modifierSelector<IModifier>('focused')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.container.color.focused,
              tokens.container.color.normal,
            ),
            elevation: fallbackVar(
              tokens.container.elevation.focused,
              tokens.container.elevation.normal,
            ),
          },
          outline: {
            color: fallbackVar(
              tokens.outline.color.focused,
              tokens.outline.color.normal,
            ),
            width: fallbackVar(
              tokens.outline.width.focused,
              tokens.outline.width.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>('hovered')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.container.color.hovered,
              tokens.container.color.normal,
            ),
            elevation: fallbackVar(
              tokens.container.elevation.hovered,
              tokens.container.elevation.normal,
            ),
          },
          outline: {
            color: fallbackVar(
              tokens.outline.color.hovered,
              tokens.outline.color.normal,
            ),
            width: fallbackVar(
              tokens.outline.width.hovered,
              tokens.outline.width.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>('pressed')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.container.color.pressed,
              tokens.container.color.normal,
            ),
            elevation: fallbackVar(
              tokens.container.elevation.pressed,
              tokens.container.elevation.normal,
            ),
          },
          outline: {
            color: fallbackVar(
              tokens.outline.color.pressed,
              tokens.outline.color.normal,
            ),
            width: fallbackVar(
              tokens.outline.width.pressed,
              tokens.outline.width.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>('disabled')]: {
        cursor: 'default',

        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.disabled,
            elevation: tokens.container.elevation.disabled,
            opacity: tokens.container.opacity.disabled,
          },
          outline: {
            color: tokens.outline.color.disabled,
            width: tokens.outline.width.disabled,
            opacity: tokens.outline.opacity.disabled,
          },
        }),
      },
      [modifierSelector<IModifier>('loading')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            elevation: fallbackVar(
              tokens.container.elevation.pressed,
              tokens.container.elevation.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>('with-start')]: {
        paddingLeft: tokens.container.leadingSpace.withStart,
      },
      [modifierSelector<IModifier>('with-end')]: {
        paddingRight: tokens.container.trailingSpace.withEnd,
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
      [modifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.label.color.focused,
          tokens.label.color.normal,
        ),
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.label.color.hovered,
          tokens.label.color.normal,
        ),
      },
      [modifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.label.color.pressed,
          tokens.label.color.normal,
        ),
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: fallbackVar(
          tokens.label.color.disabled,
          tokens.label.color.normal,
        ),
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
  icon: ({ root }) => ({
    color: fallbackVar(tokens.icon.color.normal, tokens.label.color.normal),
    pointerEvents: 'none',
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
      [modifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.icon.color.focused,
          tokens.icon.color.normal,
          tokens.label.color.focused,
          tokens.label.color.normal,
        ),
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.icon.color.hovered,
          tokens.icon.color.normal,
          tokens.label.color.hovered,
          tokens.label.color.normal,
        ),
      },
      [modifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.icon.color.pressed,
          tokens.icon.color.normal,
          tokens.label.color.pressed,
          tokens.label.color.normal,
        ),
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: fallbackVar(
          tokens.icon.color.disabled,
          tokens.icon.color.normal,
          tokens.label.color.disabled,
          tokens.label.color.normal,
        ),
        opacity: tokens.icon.opacity.disabled,
      },
      [modifierSelector<IModifier>({ 'icon-animation': 'halfSpin' }, root)]: {
        animationName: halfSpinKeyframes,
        animationDuration: themeTokens.motion.duration.long2,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
      },
    },
  }),
  slot: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slot$start: ({ root }) => ({
    selectors: {
      [modifierSelector<IModifier>('with-children', root)]: {
        marginRight: tokens.icon.labelSpace,
      },
    },
  }),
  slot$end: ({ root }) => ({
    selectors: {
      [modifierSelector<IModifier>('with-children', root)]: {
        marginLeft: tokens.icon.labelSpace,
      },
    },
  }),
  slot$icon: {
    vars: overrideTokens(Slot.theme.tokens, {
      container: {
        width: tokens.icon.size,
      },
    }),
  },
  slot$icon$start: ({ root }) => ({
    vars: overrideTokens(Slot.theme.tokens, {
      container: {
        leadingSpace: {
          compensated: calc.subtract(
            tokens.container.leadingSpace.withStart,
            tokens.container.leadingSpace.normal,
          ),
        },
      },
    }),
    selectors: {
      [modifierSelector<IModifier>('with-children', root)]: {
        vars: overrideTokens(Slot.theme.tokens, {
          container: {
            trailingSpace: {
              normal: tokens.icon.labelSpace,
            },
          },
        }),
      },
    },
  }),
  slot$icon$end: ({ root }) => ({
    vars: overrideTokens(Slot.theme.tokens, {
      container: {
        leadingSpace: {
          normal: tokens.icon.labelSpace,
        },
      },
    }),
    selectors: {
      [modifierSelector<IModifier>('with-children', root)]: {
        vars: overrideTokens(Slot.theme.tokens, {
          container: {
            trailingSpace: {
              compensated: calc.subtract(
                tokens.container.trailingSpace.withEnd,
                tokens.container.trailingSpace.normal,
              ),
            },
          },
        }),
      },
    },
  }),
  stateLayer: {},
  touchTarget: {},
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
        ...overrideTokens(tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.surfaceContainerLow,
            },
            elevation: {
              normal: elevationLevelPreset[1],
              focused: elevationLevelPreset[1],
              hovered: elevationLevelPreset[2],
              pressed: elevationLevelPreset[1],
              disabled: elevationLevelPreset[0],
            },
          },
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
      vars: overrideTokens(StateLayer.theme.tokens, {
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
        ...overrideTokens(tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.primary,
            },
            elevation: {
              hovered: elevationLevelPreset[1],
              pressed: elevationLevelPreset[1],
            },
          },
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
      vars: overrideTokens(StateLayer.theme.tokens, {
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
        ...overrideTokens(tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.secondaryContainer,
            },
            elevation: {
              hovered: elevationLevelPreset[1],
            },
          },
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
      vars: overrideTokens(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.onSecondaryContainer,
          pressed: themeTokens.colorScheme.onSecondaryContainer,
        },
      }),
    },
  }),
  outlined: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          color: {
            disabled: 'unset',
          },
          elevation: {
            hovered: elevationLevelPreset[0],
          },
        },
        outline: {
          color: {
            normal: themeTokens.colorScheme.outline,
            disabled: themeTokens.colorScheme.outline,
          },
          width: {
            normal: px(themeTokens.outline.width.xs),
            disabled: px(themeTokens.outline.width.xs),
          },
          opacity: {
            disabled: themeTokens.state.opacity.disabled,
          },
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
      vars: overrideTokens(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.primary,
          pressed: themeTokens.colorScheme.primary,
        },
      }),
    },
  }),
  text: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          color: {
            disabled: 'unset',
          },
          leadingSpace: {
            normal: px(space(3)),
            withStart: px(space(3)),
          },
          trailingSpace: {
            normal: px(space(3)),
            withEnd: px(space(3)),
          },
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
      vars: overrideTokens(StateLayer.theme.tokens, {
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
        ...overrideTokens(tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.errorContainer,
            },
            elevation: {
              hovered: elevationLevelPreset[1],
            },
          },
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
      vars: overrideTokens(StateLayer.theme.tokens, {
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
        ...overrideTokens(PaperBase.theme.tokens, {
          container: {
            shape: px(themeTokens.shape.corner.xs),
          },
        }),
        ...overrideTokens(tokens, {
          container: {
            color: {
              disabled: 'unset',
            },
            leadingSpace: {
              normal: px(space(4)),
              withStart: px(space(3)),
            },
            trailingSpace: {
              normal: px(space(4)),
              withEnd: px(space(3)),
            },
            minHeight: px(32),
          },
          icon: {
            color: {
              normal: themeTokens.colorScheme.inversePrimary,
            },
          },
          label: {
            color: {
              normal: themeTokens.colorScheme.inversePrimary,
              disabled: themeTokens.colorScheme.inversePrimary,
            },
          },
        }),
      },
    },
    stateLayer: {
      vars: overrideTokens(StateLayer.theme.tokens, {
        color: {
          hovered: themeTokens.colorScheme.inversePrimary,
          pressed: themeTokens.colorScheme.inversePrimary,
        },
      }),
    },
  }),
  inline: createStyles({
    root: {
      verticalAlign: 'baseline',
      ...typography(null),

      vars: {
        ...overrideTokens(tokens, {
          container: {
            color: {
              disabled: 'unset',
            },
            minHeight: em(1),
            minWidth: em(1),
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
            size: em(1),
            labelSpace: em(0.25),
          },
          label: {
            color: {
              normal: themeTokens.colorScheme.primary,
            },
          },
        }),
      },
    },
    label: ({ root }) => ({
      textDecoration: 'underline',

      selectors: {
        [modifierSelector<IModifier>('disabled', root)]: {
          textDecoration: 'none',
        },
      },
    }),
    stateLayer: {
      inset: calc.multiply(-0.5, `max(1em, 16px)`),
    },
    focusRing: {
      inset: calc.subtract(calc.multiply(-0.5, `max(1em, 16px)`), '3px'),
    },
  }),
};
