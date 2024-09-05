import { createTheme, fallbackVar, keyframes } from '@vanilla-extract/css';
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
      hovered: 'unset',
      pressed: 'unset',
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
      disabled: 'inherit',
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
      disabled: 'inherit',
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
      [PaperBase.theme.tokens.container.color.disabled]: fallbackVar(
        tokens.container.color.disabled,
        tokens.container.color.normal,
      ),
      [PaperBase.theme.tokens.container.opacity.disabled]:
        tokens.container.opacity.disabled,
      [PaperBase.theme.tokens.container.elevation.normal]:
        tokens.container.elevation.normal,
      [PaperBase.theme.tokens.container.elevation.disabled]: fallbackVar(
        tokens.container.elevation.disabled,
        tokens.container.elevation.normal,
      ),
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
          [PaperBase.theme.tokens.container.elevation.normal]: fallbackVar(
            tokens.container.elevation.focused,
            tokens.container.elevation.normal,
          ),
        },
      },
      [getModifierSelector<IModifier>('hovered')]: {
        vars: {
          [PaperBase.theme.tokens.container.elevation.normal]: fallbackVar(
            tokens.container.elevation.hovered,
            tokens.container.elevation.normal,
          ),
        },
      },
      [getModifierSelector<IModifier>('pressed')]: {
        vars: {
          [PaperBase.theme.tokens.container.elevation.normal]: fallbackVar(
            tokens.container.elevation.pressed,
            tokens.container.elevation.normal,
          ),
        },
      },
      [getModifierSelector<IModifier>('loading')]: {
        vars: {
          [PaperBase.theme.tokens.container.elevation.normal]: fallbackVar(
            tokens.container.elevation.pressed,
            tokens.container.elevation.normal,
          ),
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
    color: tokens.icon.color.normal,
    fontSize: px(tokens.icon.size),
    inlineSize: px(tokens.icon.size),
    blockSize: px(tokens.icon.size),

    selectors: {
      [getModifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(tokens.icon.color.focused, tokens.icon.color.normal),
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(tokens.icon.color.hovered, tokens.icon.color.normal),
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(tokens.icon.color.pressed, tokens.icon.color.normal),
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: fallbackVar(
          tokens.icon.color.disabled,
          tokens.icon.color.normal,
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
    paddingInlineStart: px(tokens.leadingSpace.normal),
    paddingInlineEnd: px(tokens.trailingSpace.normal),
  },
  invisible: {
    visibility: 'hidden',
  },
  stateLayer: {
    vars: {
      [StateLayer.theme.tokens.color.hovered]: fallbackVar(
        tokens.stateLayer.color.hovered,
        tokens.label.color.normal,
      ),
      [StateLayer.theme.tokens.color.pressed]: fallbackVar(
        tokens.stateLayer.color.pressed,
        tokens.label.color.normal,
      ),
      [StateLayer.theme.tokens.opacity.hovered]:
        tokens.stateLayer.opacity.hovered,
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
  tokensClassName,
  tokens,
});

export const buttonThemeVariants = {
  elevated: createStyles({
    root: {
      vars: {
        [tokens.container.color.normal]:
          themeTokens.colorScheme.surfaceContainerLow,
        [tokens.container.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.container.elevation.normal]: elevationLevelPreset[1],
        [tokens.container.elevation.focused]: elevationLevelPreset[1],
        [tokens.container.elevation.hovered]: elevationLevelPreset[2],
        [tokens.container.elevation.pressed]: elevationLevelPreset[1],
        [tokens.container.elevation.disabled]: elevationLevelPreset[0],
        [tokens.label.color.normal]: themeTokens.colorScheme.primary,
        [tokens.label.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.icon.color.normal]: themeTokens.colorScheme.primary,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
      },
    },
  }),
  filled: createStyles({
    root: {
      vars: {
        [tokens.container.color.normal]: themeTokens.colorScheme.primary,
        [tokens.container.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.container.elevation.hovered]: elevationLevelPreset[1],
        [tokens.label.color.normal]: themeTokens.colorScheme.onPrimary,
        [tokens.label.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.icon.color.normal]: themeTokens.colorScheme.onPrimary,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
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
        [tokens.label.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.icon.color.normal]:
          themeTokens.colorScheme.onSecondaryContainer,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
      },
    },
  }),
  outlined: createStyles({
    root: {
      vars: {
        [tokens.label.color.normal]: themeTokens.colorScheme.primary,
        [tokens.label.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.icon.color.normal]: themeTokens.colorScheme.primary,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.outline.style]: 'solid',
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
        [tokens.label.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.icon.color.normal]: themeTokens.colorScheme.primary,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
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
        [tokens.label.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.icon.color.normal]: themeTokens.colorScheme.onErrorContainer,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
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
        [tokens.container.shape]: px(themeTokens.shape.corner.xs),
        [tokens.label.color.normal]: themeTokens.colorScheme.inversePrimary,
        [tokens.icon.color.normal]: themeTokens.colorScheme.inversePrimary,
      },
    },
  }),
};
