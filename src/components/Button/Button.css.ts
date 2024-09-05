import { createTheme, keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
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
import { themeTokens } from '../ThemeProvider';
import { PaperBase } from '../PaperBase';
import { elevationLevelPreset } from '../Elevation/Elevation.css';
import { StateLayer } from '../StateLayer';

export type IButtonVariant =
  | 'elevated'
  | 'filled'
  | 'filledTonal'
  | 'outlined'
  | 'text'
  | 'danger'
  | 'snackbar';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'loading'
  | 'with-leading-icon'
  | 'with-trailing-icon'
  | 'icon-animation';

const [tokensClassName, tokens] = createTheme({
  density: getDensity({ min: -4, max: 0 }),
  gap: space(2),
  leadingSpace: {
    normal: space(6),
    withLeadingIcon: space(4),
    withTrailingIcon: space(6),
  },
  trailingSpace: {
    normal: space(6),
    withLeadingIcon: space(6),
    withTrailingIcon: space(4),
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
    height: '40px',
    minWidth: '64px',
    shape: themeTokens.shape.corner.full,
  },
  stateLayer: {
    color: {
      hover: 'unset',
      pressed: 'unset',
    },
    opacity: {
      hover: themeTokens.state.stateLayerOpacity.hover,
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
    size: '18px',
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
  outline: {
    style: 'none',
    width: themeTokens.outline.width.xs,
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
});

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
    vars: {
      [PaperBase.theme.tokens.container.color.normal]:
        tokens.container.color.normal,
      [PaperBase.theme.tokens.container.color.disabled]:
        tokens.container.color.disabled,
      [PaperBase.theme.tokens.container.opacity.disabled]:
        tokens.container.opacity.disabled,
      [PaperBase.theme.tokens.container.elevation.normal]:
        tokens.container.elevation.normal,
      [PaperBase.theme.tokens.container.elevation.disabled]:
        tokens.container.elevation.disabled,
    },

    borderRadius: px(tokens.container.shape),
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
    paddingInlineStart: px(tokens.leadingSpace.normal),
    paddingInlineEnd: px(tokens.trailingSpace.normal),
    // min-height instead of height so that label can wrap and expand height
    minHeight: calc.add(px(tokens.container.height), px(tokens.density)),
    // Add extra space between label and the edge for if the label text wraps.
    // The padding added should be relative to the height of the container and
    // the height of its content on a single line (label or icon, whichever is
    // bigger).
    paddingBlock: calc.divide(
      calc.subtract(
        px(tokens.container.height),
        px(tokens.label.typography.lineHeight),
      ),
      2,
    ),
    minWidth: calc.subtract(
      px(tokens.container.minWidth),
      px(tokens.leadingSpace.normal),
      px(tokens.trailingSpace.normal),
    ),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        cursor: 'default',
      },
      [getModifierSelector<IModifier>('focused')]: {
        vars: {
          [PaperBase.theme.tokens.container.elevation.normal]:
            tokens.container.elevation.focused,
        },
      },
      [getModifierSelector<IModifier>('hovered')]: {
        vars: {
          [PaperBase.theme.tokens.container.elevation.normal]:
            tokens.container.elevation.hovered,
        },
      },
      [getModifierSelector<IModifier>('pressed')]: {
        vars: {
          [PaperBase.theme.tokens.container.elevation.normal]:
            tokens.container.elevation.pressed,
        },
      },
      [getModifierSelector<IModifier>('loading')]: {
        vars: {
          [PaperBase.theme.tokens.container.elevation.normal]:
            tokens.container.elevation.pressed,
        },
      },
      [getModifierSelector<IModifier>('with-leading-icon')]: {
        paddingInlineStart: px(tokens.leadingSpace.withLeadingIcon),
        paddingInlineEnd: px(tokens.trailingSpace.withLeadingIcon),
      },
      [getModifierSelector<IModifier>('with-trailing-icon')]: {
        paddingInlineStart: px(tokens.leadingSpace.withTrailingIcon),
        paddingInlineEnd: px(tokens.trailingSpace.withTrailingIcon),
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
        color: tokens.label.color.focused,
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: tokens.label.color.hovered,
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        color: tokens.label.color.pressed,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
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
    color: tokens.icon.color.normal,
    fontSize: px(tokens.icon.size),
    inlineSize: px(tokens.icon.size),
    blockSize: px(tokens.icon.size),

    selectors: {
      [getModifierSelector<IModifier>('focused', root)]: {
        color: tokens.icon.color.focused,
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: tokens.icon.color.hovered,
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        color: tokens.icon.color.pressed,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.icon.color.disabled,
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
    paddingInlineStart: px(tokens.leadingSpace.normal),
    paddingInlineEnd: px(tokens.trailingSpace.normal),
  },
  invisible: {
    visibility: 'hidden',
  },
  stateLayer: {
    vars: {
      [StateLayer.theme.tokens.color.hover]: tokens.stateLayer.color.hover,
      [StateLayer.theme.tokens.color.pressed]: tokens.stateLayer.color.pressed,
      [StateLayer.theme.tokens.opacity.hover]: tokens.stateLayer.opacity.hover,
      [StateLayer.theme.tokens.opacity.pressed]:
        tokens.stateLayer.opacity.pressed,
    },
  },
  outline: ({ root }) => ({
    borderStyle: tokens.outline.style,
    borderWidth: px(tokens.outline.width),
    borderColor: tokens.outline.color.normal,

    selectors: {
      [getModifierSelector<IModifier>('focused', root)]: {
        borderColor: tokens.outline.color.focused,
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        borderColor: tokens.outline.color.pressed,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        borderColor: tokens.outline.color.disabled,
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
  tokensClassName,
  tokens,
});

export const buttonThemeVariants = {
  filled: createStyles({
    root: {
      vars: {
        [tokens.container.color.normal]: themeTokens.colorScheme.primary,
        [tokens.container.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.container.elevation.hovered]: elevationLevelPreset[1],
        [tokens.label.color.normal]: themeTokens.colorScheme.onPrimary,
        [tokens.label.color.focused]: themeTokens.colorScheme.onPrimary,
        [tokens.label.color.hovered]: themeTokens.colorScheme.onPrimary,
        [tokens.label.color.pressed]: themeTokens.colorScheme.onPrimary,
        [tokens.icon.color.normal]: themeTokens.colorScheme.onPrimary,
        [tokens.icon.color.focused]: themeTokens.colorScheme.onPrimary,
        [tokens.icon.color.hovered]: themeTokens.colorScheme.onPrimary,
        [tokens.icon.color.pressed]: themeTokens.colorScheme.onPrimary,
      },
    },
    stateLayer: {
      vars: {
        [tokens.stateLayer.color.hover]: themeTokens.colorScheme.onPrimary,
        [tokens.stateLayer.color.pressed]: themeTokens.colorScheme.onPrimary,
      },
    },
  }),
  filledTonal: createStyles({
    root: {
      vars: {
        [tokens.container.color.normal]:
          themeTokens.colorScheme.secondaryContainer,
        [tokens.container.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.container.elevation.hovered]: elevationLevelPreset[1],
        [tokens.label.color.normal]:
          themeTokens.colorScheme.onSecondaryContainer,
        [tokens.label.color.focused]:
          themeTokens.colorScheme.onSecondaryContainer,
        [tokens.label.color.hovered]:
          themeTokens.colorScheme.onSecondaryContainer,
        [tokens.label.color.pressed]:
          themeTokens.colorScheme.onSecondaryContainer,
        [tokens.icon.color.normal]:
          themeTokens.colorScheme.onSecondaryContainer,
        [tokens.icon.color.focused]:
          themeTokens.colorScheme.onSecondaryContainer,
        [tokens.icon.color.hovered]:
          themeTokens.colorScheme.onSecondaryContainer,
        [tokens.icon.color.pressed]:
          themeTokens.colorScheme.onSecondaryContainer,
      },
    },
    stateLayer: {
      vars: {
        [tokens.stateLayer.color.hover]:
          themeTokens.colorScheme.onSecondaryContainer,
        [tokens.stateLayer.color.pressed]:
          themeTokens.colorScheme.onSecondaryContainer,
      },
    },
  }),
  outlined: createStyles({
    root: {
      vars: {
        [tokens.label.color.normal]: themeTokens.colorScheme.primary,
        [tokens.label.color.focused]: themeTokens.colorScheme.primary,
        [tokens.label.color.hovered]: themeTokens.colorScheme.primary,
        [tokens.label.color.pressed]: themeTokens.colorScheme.primary,
        [tokens.icon.color.normal]: themeTokens.colorScheme.primary,
        [tokens.icon.color.focused]: themeTokens.colorScheme.primary,
        [tokens.icon.color.hovered]: themeTokens.colorScheme.primary,
        [tokens.icon.color.pressed]: themeTokens.colorScheme.primary,
        [tokens.outline.style]: 'solid',
      },
    },
    stateLayer: {
      vars: {
        [tokens.stateLayer.color.hover]: themeTokens.colorScheme.primary,
        [tokens.stateLayer.color.pressed]: themeTokens.colorScheme.primary,
      },
    },
  }),
  text: createStyles({
    root: {
      vars: {
        [tokens.leadingSpace.normal]: px(space(3)),
        [tokens.leadingSpace.withLeadingIcon]: px(space(3)),
        [tokens.leadingSpace.withTrailingIcon]: px(space(4)),
        [tokens.trailingSpace.normal]: px(space(3)),
        [tokens.trailingSpace.withLeadingIcon]: px(space(4)),
        [tokens.trailingSpace.withTrailingIcon]: px(space(3)),
        [tokens.label.color.normal]: themeTokens.colorScheme.primary,
        [tokens.label.color.focused]: themeTokens.colorScheme.primary,
        [tokens.label.color.hovered]: themeTokens.colorScheme.primary,
        [tokens.label.color.pressed]: themeTokens.colorScheme.primary,
        [tokens.icon.color.normal]: themeTokens.colorScheme.primary,
        [tokens.icon.color.focused]: themeTokens.colorScheme.primary,
        [tokens.icon.color.hovered]: themeTokens.colorScheme.primary,
        [tokens.icon.color.pressed]: themeTokens.colorScheme.primary,
      },
    },
    stateLayer: {
      vars: {
        [tokens.stateLayer.color.hover]: themeTokens.colorScheme.primary,
        [tokens.stateLayer.color.pressed]: themeTokens.colorScheme.primary,
      },
    },
  }),
  danger: createStyles({
    root: {
      vars: {
        [tokens.container.color.normal]: themeTokens.colorScheme.errorContainer,
        [tokens.container.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.container.elevation.hovered]: elevationLevelPreset[1],
        [tokens.label.color.normal]: themeTokens.colorScheme.onErrorContainer,
        [tokens.label.color.focused]: themeTokens.colorScheme.onErrorContainer,
        [tokens.label.color.hovered]: themeTokens.colorScheme.onErrorContainer,
        [tokens.label.color.pressed]: themeTokens.colorScheme.onErrorContainer,
        [tokens.icon.color.normal]: themeTokens.colorScheme.onErrorContainer,
        [tokens.icon.color.focused]: themeTokens.colorScheme.onErrorContainer,
        [tokens.icon.color.hovered]: themeTokens.colorScheme.onErrorContainer,
        [tokens.icon.color.pressed]: themeTokens.colorScheme.onErrorContainer,
      },
    },
    stateLayer: {
      vars: {
        [tokens.stateLayer.color.hover]:
          themeTokens.colorScheme.onSecondaryContainer,
        [tokens.stateLayer.color.pressed]:
          themeTokens.colorScheme.onSecondaryContainer,
      },
    },
  }),
  snackbar: createStyles({
    root: {
      vars: {
        [tokens.leadingSpace.normal]: px(space(4)),
        [tokens.leadingSpace.withLeadingIcon]: px(space(3)),
        [tokens.leadingSpace.withTrailingIcon]: px(space(4)),
        [tokens.trailingSpace.normal]: px(space(4)),
        [tokens.trailingSpace.withLeadingIcon]: px(space(4)),
        [tokens.trailingSpace.withTrailingIcon]: px(space(3)),
        [tokens.container.height]: px(32),
        [tokens.container.shape]: themeTokens.shape.corner.xs,
        [tokens.label.color.normal]: themeTokens.colorScheme.inversePrimary,
        [tokens.label.color.focused]: themeTokens.colorScheme.inversePrimary,
        [tokens.label.color.hovered]: themeTokens.colorScheme.inversePrimary,
        [tokens.label.color.pressed]: themeTokens.colorScheme.inversePrimary,
        [tokens.label.color.disabled]: themeTokens.colorScheme.inversePrimary,
        [tokens.icon.color.normal]: themeTokens.colorScheme.inversePrimary,
        [tokens.icon.color.focused]: themeTokens.colorScheme.inversePrimary,
        [tokens.icon.color.hovered]: themeTokens.colorScheme.inversePrimary,
        [tokens.icon.color.pressed]: themeTokens.colorScheme.inversePrimary,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.inversePrimary,
      },
    },
    stateLayer: {
      vars: {
        [tokens.stateLayer.color.hover]: themeTokens.colorScheme.inversePrimary,
        [tokens.stateLayer.color.pressed]:
          themeTokens.colorScheme.inversePrimary,
      },
    },
  }),
};
