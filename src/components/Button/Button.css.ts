import {
  createTheme,
  createThemeContract,
  fallbackVar,
  keyframes,
} from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IButtonVariant } from './Button.types';
import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { space } from '~/helpers/styles/space';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { deepMerge } from '~/helpers/deepMerge';
import { themeTokens } from '../ThemeProvider';
import { PaperBase } from '../PaperBase';
import { elevationLevelPreset } from '../Elevation/Elevation.css';
import { StateLayer } from '../StateLayer';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'loading'
  | 'with-leading-icon'
  | 'with-trailing-icon'
  | 'icon-animation';

const DENSITY = px(getDensity({ min: -4, max: 0 }));

const defaultTokens = {
  gap: px(space(2)),
  leadingSpace: {
    normal: px(space(6)),
    withLeadingIcon: px(space(4)),
    withTrailingIcon: px(space(6)),
  },
  trailingSpace: {
    normal: px(space(6)),
    withLeadingIcon: px(space(6)),
    withTrailingIcon: px(space(4)),
  },
  container: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
    elevation: {
      normal: 'unset',
      disabled: 'unset',
      focused: 'unset',
      hovered: 'unset',
      pressed: 'unset',
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
    height: px(40),
    minWidth: px(64),
    shape: {
      topLeft: px(themeTokens.shape.corner.full),
      topRight: px(themeTokens.shape.corner.full),
      bottomRight: px(themeTokens.shape.corner.full),
      bottomLeft: px(themeTokens.shape.corner.full),
    },
  },
  stateLayer: {
    color: {
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      hovered: themeTokens.state.stateLayerOpacity.hovered,
      pressed: themeTokens.state.stateLayerOpacity.pressed,
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
  outline: {
    style: 'unset',
    width: px(themeTokens.outline.width.xs),
    color: {
      normal: themeTokens.colorScheme.outline,
      disabled: themeTokens.colorScheme.onSurface,
      focused: themeTokens.colorScheme.outline,
      pressed: themeTokens.colorScheme.outline,
    },
    opacity: {
      disabled: themeTokens.state.outlineOpacity.disabled,
    },
  },
};

const tokens = createThemeContract(defaultTokens);

const halfSpinKeyframes = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(180deg)',
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: {
          normal: tokens.container.color.normal,
          disabled: fallbackVar(
            tokens.container.color.disabled,
            tokens.container.color.normal,
          ),
        },
        opacity: {
          disabled: tokens.container.opacity.disabled,
        },
        elevation: {
          normal: tokens.container.elevation.normal,
          disabled: fallbackVar(
            tokens.container.elevation.disabled,
            tokens.container.elevation.normal,
          ),
        },
        shape: tokens.container.shape,
      },
    }),

    cursor: 'pointer',
    display: 'inline-flex',
    outline: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    position: 'relative',
    ...getTypographyStyles(tokens.label.typography),
    // Override vertical-align with shortest value "top". Vertical-align's
    // default "baseline" value causes buttons to be misaligned next to each
    // other if one button has an icon and the other does not.
    verticalAlign: 'top',

    gap: tokens.gap,
    paddingInlineStart: tokens.leadingSpace.normal,
    paddingInlineEnd: tokens.trailingSpace.normal,
    // min-height instead of height so that label can wrap and expand height
    minHeight: calc.add(tokens.container.height, DENSITY),
    // Add extra space between label and the edge for if the label text wraps.
    // The padding added should be relative to the height of the container and
    // the height of its content on a single line (label or icon, whichever is
    // bigger).
    paddingBlock: calc.divide(
      calc.subtract(
        tokens.container.height,
        tokens.label.typography.lineHeight,
      ),
      2,
    ),
    minWidth: calc.subtract(
      tokens.container.minWidth,
      tokens.leadingSpace.normal,
      tokens.trailingSpace.normal,
    ),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        cursor: 'default',
      },
      [getModifierSelector<IModifier>('focused')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            elevation: {
              normal: fallbackVar(
                tokens.container.elevation.focused,
                tokens.container.elevation.normal,
              ),
            },
          },
        }),
      },
      [getModifierSelector<IModifier>('hovered')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            elevation: {
              normal: fallbackVar(
                tokens.container.elevation.hovered,
                tokens.container.elevation.normal,
              ),
            },
          },
        }),
      },
      [getModifierSelector<IModifier>('pressed')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            elevation: {
              normal: fallbackVar(
                tokens.container.elevation.pressed,
                tokens.container.elevation.normal,
              ),
            },
          },
        }),
      },
      [getModifierSelector<IModifier>('loading')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            elevation: {
              disabled: fallbackVar(
                tokens.container.elevation.pressed,
                tokens.container.elevation.normal,
              ),
            },
          },
        }),
      },
      [getModifierSelector<IModifier>('with-leading-icon')]: {
        paddingInlineStart: tokens.leadingSpace.withLeadingIcon,
        paddingInlineEnd: tokens.trailingSpace.withLeadingIcon,
      },
      [getModifierSelector<IModifier>('with-trailing-icon')]: {
        paddingInlineStart: tokens.leadingSpace.withTrailingIcon,
        paddingInlineEnd: tokens.trailingSpace.withTrailingIcon,
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
    color: fallbackVar(tokens.icon.color.normal, tokens.label.color.normal),
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
  stateLayer: {
    vars: createTokensVars(StateLayer.theme.tokens, {
      color: {
        hovered: tokens.stateLayer.color.hovered,
        pressed: fallbackVar(
          tokens.stateLayer.color.pressed,
          tokens.stateLayer.color.hovered,
        ),
      },
    }),
  },
  outline: ({ root }) => ({
    borderStyle: tokens.outline.style,
    borderWidth: `max(${tokens.outline.width}, 1px)`,
    borderColor: tokens.outline.color.normal,

    selectors: {
      [getModifierSelector<IModifier>('focused', root)]: {
        borderColor: fallbackVar(
          tokens.outline.color.focused,
          tokens.outline.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        borderColor: fallbackVar(
          tokens.outline.color.pressed,
          tokens.outline.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        borderColor: fallbackVar(
          tokens.outline.color.disabled,
          tokens.outline.color.normal,
        ),
        opacity: tokens.outline.opacity.disabled,
      },
    },
  }),
});

export type IButtonThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IButtonVariant;
}>;

export const buttonTheme = componentThemeFactory<IButtonThemeFactory>({
  classNames,
  tokens,
});

export const buttonThemeVariants = {
  elevated: createStyles({
    root: [
      createTheme(
        tokens,
        deepMerge(defaultTokens, {
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
          label: {
            color: {
              normal: themeTokens.colorScheme.primary,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
          stateLayer: {
            color: {
              hovered: themeTokens.colorScheme.primary,
              pressed: themeTokens.colorScheme.primary,
            },
          },
        }),
      ),
    ],
  }),
  filled: createStyles({
    root: [
      createTheme(
        tokens,
        deepMerge(defaultTokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.primary,
              disabled: themeTokens.colorScheme.onSurface,
            },
            elevation: {
              hovered: elevationLevelPreset[1],
            },
          },
          label: {
            color: {
              normal: themeTokens.colorScheme.onPrimary,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
          stateLayer: {
            color: {
              hovered: themeTokens.colorScheme.onPrimary,
              pressed: themeTokens.colorScheme.onPrimary,
            },
          },
        }),
      ),
    ],
  }),
  filledTonal: createStyles({
    root: [
      createTheme(
        tokens,
        deepMerge(defaultTokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.secondaryContainer,
              disabled: themeTokens.colorScheme.onSurface,
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
          stateLayer: {
            color: {
              hovered: themeTokens.colorScheme.onSecondaryContainer,
              pressed: themeTokens.colorScheme.onSecondaryContainer,
            },
          },
        }),
      ),
    ],
  }),
  outlined: createStyles({
    root: [
      createTheme(
        tokens,
        deepMerge(defaultTokens, {
          label: {
            color: {
              normal: themeTokens.colorScheme.primary,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
          outline: {
            style: 'solid',
          },
          stateLayer: {
            color: {
              hovered: themeTokens.colorScheme.primary,
              pressed: themeTokens.colorScheme.primary,
            },
          },
        }),
      ),
    ],
  }),
  text: createStyles({
    root: [
      createTheme(
        tokens,
        deepMerge(defaultTokens, {
          leadingSpace: {
            normal: px(space(3)),
            withLeadingIcon: px(space(3)),
            withTrailingIcon: px(space(4)),
          },
          trailingSpace: {
            normal: px(space(3)),
            withLeadingIcon: px(space(4)),
            withTrailingIcon: px(space(3)),
          },
          label: {
            color: {
              normal: themeTokens.colorScheme.primary,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
          stateLayer: {
            color: {
              hovered: themeTokens.colorScheme.primary,
              pressed: themeTokens.colorScheme.primary,
            },
          },
        }),
      ),
    ],
  }),
  danger: createStyles({
    root: [
      createTheme(
        tokens,
        deepMerge(defaultTokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.errorContainer,
              disabled: themeTokens.colorScheme.onSurface,
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
          stateLayer: {
            color: {
              hovered: themeTokens.colorScheme.onErrorContainer,
              pressed: themeTokens.colorScheme.onErrorContainer,
            },
          },
        }),
      ),
    ],
  }),
  snackbar: createStyles({
    root: [
      createTheme(
        tokens,
        deepMerge(defaultTokens, {
          leadingSpace: {
            normal: px(space(4)),
            withLeadingIcon: px(space(3)),
            withTrailingIcon: px(space(4)),
          },
          trailingSpace: {
            normal: px(space(4)),
            withLeadingIcon: px(space(4)),
            withTrailingIcon: px(space(3)),
          },
          container: {
            height: px(32),
            shape: {
              topLeft: px(themeTokens.shape.corner.xs),
              topRight: px(themeTokens.shape.corner.xs),
              bottomRight: px(themeTokens.shape.corner.xs),
              bottomLeft: px(themeTokens.shape.corner.xs),
            },
          },
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
          stateLayer: {
            color: {
              hovered: themeTokens.colorScheme.inversePrimary,
              pressed: themeTokens.colorScheme.inversePrimary,
            },
          },
        }),
      ),
    ],
  }),
};
