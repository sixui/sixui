import { createTheme, keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { space } from '~/helpers/styles/space';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { themeTokens } from '../ThemeProvider';
import { PaperBase } from '../PaperBase';

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
      [PaperBase.styles.tokens.container.color.normal]:
        tokens.container.color.normal,
      [PaperBase.styles.tokens.container.color.disabled]:
        tokens.container.color.disabled,
      [PaperBase.styles.tokens.container.opacity.disabled]:
        tokens.container.opacity.disabled,
      [PaperBase.styles.tokens.container.elevation.normal]:
        tokens.container.elevation.normal,
      [PaperBase.styles.tokens.container.elevation.disabled]:
        tokens.container.elevation.disabled,
    },

    alignContent: 'center',
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
          [PaperBase.styles.tokens.container.elevation.normal]:
            tokens.container.elevation.focused,
        },
      },
      [getModifierSelector<IModifier>('hovered')]: {
        vars: {
          [PaperBase.styles.tokens.container.elevation.normal]:
            tokens.container.elevation.hovered,
        },
      },
      [getModifierSelector<IModifier>('pressed')]: {
        vars: {
          [PaperBase.styles.tokens.container.elevation.normal]:
            tokens.container.elevation.pressed,
        },
      },
      [getModifierSelector<IModifier>('loading')]: {
        vars: {
          [PaperBase.styles.tokens.container.elevation.normal]:
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
  invisible: {
    visibility: 'hidden',
  },
});

export type IButtonStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const buttonStyles = stylesFactory<IButtonStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
