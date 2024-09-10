import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { themeTokens } from '../ThemeProvider';
import { StateLayer } from '../StateLayer';
import { PaperBase } from '../PaperBase';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'resizable'
  | 'with-start-section'
  | 'with-end-section'
  | 'with-label'
  | 'section'
  | 'populated'
  | 'with-error'
  | 'multiline';

// Duration of the label animation.
const LABEL_ANIMATION_DURATION = themeTokens.motion.duration.short.$3;
// Duration of the content's visibility animation.
const CONTENT_ANIMATION_DURATION = calc.divide(
  calc.multiply(LABEL_ANIMATION_DURATION, 5),
  9,
);
// Short delay when entering (focusing/populating) so that the label may move
// out of the way before the content starts to appear.
const ENTER_DELAY = calc.subtract(
  LABEL_ANIMATION_DURATION,
  CONTENT_ANIMATION_DURATION,
);

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  leadingSpace: px(space(4)),
  trailingSpace: px(space(4)),
  topSpace: {
    normal: px(space(3)),
    withLabel: px(space(2)),
  },
  bottomSpace: {
    normal: px(space(3)),
    withLabel: px(space(2)),
  },
  container: {
    minHeight: calc.add(px(56), DENSITY),
    shape: {
      topLeft: themeTokens.shape.corner.xs,
      topRight: themeTokens.shape.corner.xs,
      bottomRight: themeTokens.shape.corner.none,
      bottomLeft: themeTokens.shape.corner.none,
    },
    color: {
      normal: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  stateLayer: {
    color: {
      hovered: {
        regular: themeTokens.colorScheme.onSurface,
        error: themeTokens.colorScheme.onSurface,
      },
      pressed: {
        regular: themeTokens.colorScheme.onSurface,
        error: themeTokens.colorScheme.onSurface,
      },
    },
    opacity: {
      hovered: {
        regular: themeTokens.state.stateLayerOpacity.hovered,
        error: themeTokens.state.stateLayerOpacity.hovered,
      },
      pressed: {
        regular: themeTokens.state.stateLayerOpacity.pressed,
        error: themeTokens.state.stateLayerOpacity.pressed,
      },
    },
  },
  selection: {
    color: themeTokens.colorScheme.onSurface,
    background: themeTokens.colorScheme.inversePrimary,
  },
  content: {
    typography: themeTokens.typeScale.body.lg,
    color: {
      normal: {
        regular: themeTokens.colorScheme.onSurface,
        error: themeTokens.colorScheme.onSurface,
      },
      focused: {
        regular: themeTokens.colorScheme.onSurface,
        error: themeTokens.colorScheme.onSurface,
      },
      hovered: {
        regular: themeTokens.colorScheme.onSurface,
        error: themeTokens.colorScheme.onSurface,
      },
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  placeholder: {
    color: themeTokens.colorScheme.onSurfaceVariant,
  },
  prefix: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    trailingSpace: px(space(1)),
  },
  suffix: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    leadingSpace: px(space(1)),
  },
  label: {
    color: {
      normal: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.error,
      },
      focused: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.error,
      },
      hovered: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.error,
      },
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    typography: {
      regular: themeTokens.typeScale.body.lg,
      populated: themeTokens.typeScale.body.sm,
    },
    bottomSpace: px(space(2)),
  },
  leadingContent: {
    minWidth: px(48),
    color: {
      normal: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.error,
      },
      focused: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.onSurfaceVariant,
      },
      hovered: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.onSurfaceVariant,
      },
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  leadingIcon: {
    size: px(18),
  },
  trailingContent: {
    minWidth: px(48),
    color: {
      normal: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.error,
      },
      focused: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.onSurfaceVariant,
      },
      hovered: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.onSurfaceVariant,
      },
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  trailingIcon: {
    size: px(18),
  },
  supportingText: {
    typography: themeTokens.typeScale.body.sm,
    leadingSpace: px(space(4)),
    trailingSpace: px(space(4)),
    topSpace: px(space(1)),
    color: {
      normal: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.error,
      },
      focused: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.error,
      },
      hovered: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.error,
      },
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  activeIndicator: {
    color: {
      normal: {
        regular: themeTokens.colorScheme.onSurfaceVariant,
        error: themeTokens.colorScheme.error,
      },
      focused: {
        regular: themeTokens.colorScheme.primary,
        error: themeTokens.colorScheme.error,
      },
      hovered: {
        regular: themeTokens.colorScheme.onSurface,
        error: themeTokens.colorScheme.onErrorContainer,
      },
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    height: {
      normal: themeTokens.outline.width.xs,
      focused: themeTokens.outline.width.md,
      hovered: themeTokens.outline.width.xs,
      disabled: themeTokens.outline.width.xs,
    },
  },
  outline: {
    color: {
      normal: {
        regular: themeTokens.colorScheme.outline,
        error: themeTokens.colorScheme.error,
      },
      focused: {
        regular: themeTokens.colorScheme.primary,
        error: themeTokens.colorScheme.error,
      },
      hovered: {
        regular: themeTokens.colorScheme.onSurface,
        error: themeTokens.colorScheme.onErrorContainer,
      },
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.outlineOpacity.disabled,
    },
    width: {
      normal: themeTokens.outline.width.xs,
      focused: themeTokens.outline.width.md,
      hovered: themeTokens.outline.width.xs,
      disabled: themeTokens.outline.width.xs,
    },
    labelPadding: px(space(1)),
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: {
          normal: tokens.container.color.normal,
          disabled: tokens.container.color.disabled,
        },
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: tokens.container.color.disabled,
              disabled: tokens.container.color.disabled,
            },
            opacity: {
              disabled: tokens.container.opacity.disabled,
            },
          },
        }),
      },
    },
  },
  field: {
    position: 'relative',
    resize: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    maxWidth: '100%',
  },
  containerOverflow: {
    position: 'relative',
    resize: 'inherit',
    borderTopLeftRadius: tokens.container.shape.topLeft,
    borderTopRightRadius: tokens.container.shape.topRight,
    borderBottomRightRadius: tokens.container.shape.bottomRight,
    borderBottomLeftRadius: tokens.container.shape.bottomLeft,
    display: 'flex',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    borderRadius: 'inherit',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    minHeight: tokens.container.minHeight,
    maxHeight: '100%',
    minWidth: 'min-content',
    position: 'relative',

    selectors: {
      [getModifierSelector<IModifier>(['resizable', '!disabled'])]: {
        // `resize` is inherited from the host, but only applies to the
        // container when resizable.
        resize: 'inherit',
        // Overflow is visible when not resizable to allow overflowing content
        // such as popups or icon focus rings. Resizable fields cannot display
        // overflowing content due to `resize` not allowing it.
        overflow: 'hidden',
      },
      [getModifierSelector<IModifier>('disabled')]: {
        resize: 'none',
        overflow: 'visible',
      },
    },
  },
  section: {
    display: 'flex',
    height: '100%',
    // Relative position for absolutely positioned labels (to avoid interfering
    // with baseline alignment).
    position: 'relative',

    selectors: {
      [getModifierSelector<IModifier>({ section: 'main' })]: {
        alignItems: 'stretch',
        // The container of the field aligns sections by "center". Only the middle
        // section opts in to baseline alignment.
        //
        // Labels are absolutely positioned, which leaves only the content as the
        // evaluated baseline for the field.
        //
        // See https://www.w3.org/TR/css-flexbox-1/#baseline-participation
        alignSelf: 'baseline',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '0%',
      },
    },
  },
  labelWrapper: {
    inset: 0,
    // The resting label at 100% height can block pointer events to the content
    // if it's very long and spans the full width of the field. Additionally,
    // selecting the label's text doesn't present a good UX, since the user
    // selection should be re-focused to another element (such as the input)
    // upon focusing. Finally, since the actual label elements are swapped, it
    // is not easy to maintain the user's label text selection.
    pointerEvents: 'none',
    position: 'absolute',
    // Don't let setting text-align on the field change the label's alignment.
    // It should only impact content text.
    textAlign: 'initial',
  },
  content: ({ root }) => ({
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    transitionProperty: 'opacity',
    transitionDuration: CONTENT_ANIMATION_DURATION,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    color: tokens.content.color.normal.regular,
    WebkitTextFillColor: tokens.content.color.normal.regular,
    opacity: 0,
    transitionDelay: 'none',

    selectors: {
      [getModifierSelector<IModifier>('with-error', root)]: {
        color: tokens.content.color.focused.error,
        WebkitTextFillColor: tokens.content.color.focused.error,
      },
      [getModifierSelector<IModifier>('focused', root)]: {
        color: tokens.content.color.focused.regular,
        WebkitTextFillColor: tokens.content.color.focused.regular,
      },
      [getModifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        color: tokens.content.color.focused.error,
        WebkitTextFillColor: tokens.content.color.focused.error,
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: tokens.content.color.hovered.regular,
        WebkitTextFillColor: tokens.content.color.hovered.regular,
      },
      [getModifierSelector<IModifier>(['hovered', 'with-error'], root)]: {
        color: tokens.content.color.hovered.error,
        WebkitTextFillColor: tokens.content.color.hovered.error,
      },
      [[
        getModifierSelector<IModifier>('focused', root),
        getModifierSelector<IModifier>('!with-label', root),
        getModifierSelector<IModifier>('populated', root),
      ].join(', ')]: {
        opacity: 1,
        transitionDelay: ENTER_DELAY,
      },
      [[
        getModifierSelector<IModifier>(['!with-label', 'disabled'], root),
        getModifierSelector<IModifier>(['populated', 'disabled'], root),
      ].join(', ')]: {
        opacity: tokens.content.opacity.disabled,
      },
    },
  }),
  contentSlot: ({ root }) => ({
    // all: 'unset',
    // Use `currentColor` to inherit the various state colors that are set
    // below.
    display: 'flex',
    color: 'currentColor',
    ...getTypographyStyles(tokens.content.typography),
    width: '100%',
    // Reverting values before "all: unset"
    overflowWrap: 'revert', // Needed to break words in textarea
    whiteSpace: 'revert', // Needed for Firefox textarea
    alignItems: 'center',
    flexWrap: 'wrap', // To make the input/textarea go to new line when needed

    paddingTop: tokens.topSpace.normal,
    paddingBottom: tokens.bottomSpace.normal,

    selectors: {
      [getModifierSelector<IModifier>('multiline', root)]: {
        paddingTop: 0,
        paddingBottom: 0,

        // Use margin for textareas since they will scroll over the label if
        // not.
        marginTop: tokens.topSpace.normal,
        marginBottom: tokens.bottomSpace.normal,
      },
    },
  }),
  stateLayer: ({ root }) => ({
    vars: createTokensVars(StateLayer.theme.tokens, {
      color: {
        hovered: tokens.stateLayer.color.hovered.regular,
        pressed: tokens.stateLayer.color.pressed.regular,
      },
      opacity: {
        hovered: tokens.stateLayer.opacity.hovered.regular,
        pressed: tokens.stateLayer.opacity.pressed.regular,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('with-error', root)]: {
        vars: createTokensVars(StateLayer.theme.tokens, {
          color: {
            hovered: tokens.stateLayer.color.hovered.error,
            pressed: tokens.stateLayer.color.pressed.error,
          },
          opacity: {
            hovered: tokens.stateLayer.opacity.hovered.error,
            pressed: tokens.stateLayer.opacity.pressed.error,
          },
        }),
      },
    },
  }),
});

export type IFieldBaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const fieldBaseTheme = componentThemeFactory<IFieldBaseThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const fieldBaseThemeVariants = {
  filled: createStyles({
    root: {
      vars: {
        ...createTokensVars(tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.surfaceContainerHighest,
            },
            opacity: {
              disabled: '0.04',
            },
          },
        }),
      },
    },
    container: {
      selectors: {
        [getModifierSelector<IModifier>('resizable')]: {
          // Move the container up so that the resize handle doesn't overlap the focus
          // indicator. Content is moved back the opposite direction.
          bottom: tokens.activeIndicator.height.focused,
          // Ensures the container doesn't create an overhang that can be clicked on.
          clipPath: `inset(${tokens.activeIndicator.height.focused} 0 0 0)`,
        },
      },
    },
    section: {
      selectors: {
        [getModifierSelector<IModifier>('resizable')]: {
          top: tokens.activeIndicator.height.focused,
        },
      },
    },
  }),
};
