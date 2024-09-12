import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IFieldBaseVariant } from './FieldBase.types';
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
import { FieldBaseOutline } from '../FieldBaseOutline';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'resizable'
  | 'with-start-section'
  | 'with-end-section'
  | 'with-label'
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
    withLabel: px(space(1)),
  },
  bottomSpace: {
    normal: px(space(3)),
    withLabel: px(space(2)),
  },
  container: {
    minHeight: calc.add(px(56), DENSITY),
    shape: {
      topLeft: px(themeTokens.shape.corner.xs),
      topRight: px(themeTokens.shape.corner.xs),
      bottomRight: px(themeTokens.shape.corner.none),
      bottomLeft: px(themeTokens.shape.corner.none),
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
      resting: themeTokens.typeScale.body.lg,
      floating: themeTokens.typeScale.body.sm,
    },
    padding: px(space(1)),
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
      normal: px(themeTokens.outline.width.xs),
      focused: px(themeTokens.outline.width.md),
      hovered: px(themeTokens.outline.width.xs),
      disabled: px(themeTokens.outline.width.xs),
    },
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    resize: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    maxWidth: '100%',

    selectors: {
      [getModifierSelector('disabled')]: {
        cursor: 'default',
        pointerEvents: 'none',
      },
    },
  },
  container: {
    position: 'relative',
    resize: 'inherit',
    display: 'flex',
    height: '100%',

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: {
          normal: tokens.container.color.normal,
          disabled: tokens.container.color.disabled,
        },
        shape: tokens.container.shape,
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
  inner: {
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
  },
  section$start: ({ root }) => ({
    alignItems: 'center',
    justifyContent: 'start',
    paddingInlineStart: px(space(2)),
    color: tokens.leadingContent.color.normal.regular,
    minWidth: tokens.leadingContent.minWidth,

    selectors: {
      [getModifierSelector<IModifier>('with-error', root)]: {
        color: tokens.leadingContent.color.normal.error,
      },
      [getModifierSelector<IModifier>('focused', root)]: {
        color: tokens.leadingContent.color.focused.regular,
      },
      [getModifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        color: tokens.leadingContent.color.focused.error,
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: tokens.leadingContent.color.hovered.regular,
      },
      [getModifierSelector<IModifier>(['hovered', 'with-error'], root)]: {
        color: tokens.leadingContent.color.hovered.error,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.leadingContent.color.disabled,
        opacity: tokens.leadingContent.opacity.disabled,
      },
    },
  }),
  section$end: ({ root }) => ({
    alignItems: 'center',
    justifyContent: 'end',
    paddingInlineEnd: px(space(2)),
    color: tokens.trailingContent.color.normal.regular,
    minWidth: tokens.trailingContent.minWidth,

    selectors: {
      [getModifierSelector<IModifier>('with-error', root)]: {
        color: tokens.trailingContent.color.normal.error,
      },
      [getModifierSelector<IModifier>('focused', root)]: {
        color: tokens.trailingContent.color.focused.regular,
      },
      [getModifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        color: tokens.trailingContent.color.focused.error,
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: tokens.trailingContent.color.hovered.regular,
      },
      [getModifierSelector<IModifier>(['hovered', 'with-error'], root)]: {
        color: tokens.trailingContent.color.hovered.error,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.trailingContent.color.disabled,
        opacity: tokens.trailingContent.opacity.disabled,
      },
    },
  }),
  section$main: {
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
  // Labels need start/end padding when there isn't start/end content so they
  // don't sit on the edge of the field. We use a wrapper element around the
  // labels so as not to affect the dimensions used in the label keyframes.
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
  label: ({ root }) => ({
    overflow: 'hidden',
    maxWidth: '100%',
    // Check with design, should there be any transition from resting to
    // floating when there is a mismatch between ellipsis, such as opacity
    // transition?
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    zIndex: 1,
    ...getTypographyStyles(tokens.label.typography.resting),
    width: 'min-content',
    color: tokens.label.color.normal.regular,

    selectors: {
      [getModifierSelector<IModifier>('with-error', root)]: {
        color: tokens.label.color.normal.error,
      },
      [getModifierSelector<IModifier>('focused', root)]: {
        color: tokens.label.color.focused.regular,
      },
      [getModifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        color: tokens.label.color.focused.error,
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: tokens.label.color.hovered.regular,
      },
      [getModifierSelector<IModifier>(['hovered', 'with-error'], root)]: {
        color: tokens.label.color.hovered.error,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
  label$resting: {
    position: 'absolute',
    insetBlockStart: '50%',
    transform: 'translateY(-50%)',
  },
  label$floating: {
    ...getTypographyStyles(tokens.label.typography.floating),
    transformOrigin: 'top left',
  },
  label$invisible: {
    visibility: 'hidden',
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
    transitionDelay: 'unset',

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

    selectors: {
      [getModifierSelector<IModifier>('!multiline', root)]: {
        paddingTop: tokens.topSpace.normal,
        paddingBottom: tokens.bottomSpace.normal,
      },
      [getModifierSelector<IModifier>('multiline', root)]: {
        // Use margin for textareas since they will scroll over the label if
        // not.
        marginTop: tokens.topSpace.normal,
        marginBottom: tokens.bottomSpace.normal,
      },
      [getModifierSelector<IModifier>('!with-end-section', root)]: {
        paddingInlineEnd: tokens.trailingSpace,
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
  activeIndicator: {},
  activeIndicatorBackground: {},
  activeIndicatorFocus: {},
  supportingText: ({ root }) => ({
    display: 'flex',
    ...getTypographyStyles(tokens.supportingText.typography),
    gap: px(space(4)),
    justifyContent: 'space-between',
    paddingInlineStart: tokens.supportingText.leadingSpace,
    paddingInlineEnd: tokens.supportingText.trailingSpace,
    paddingTop: tokens.supportingText.topSpace,
    color: tokens.supportingText.color.normal.regular,

    selectors: {
      [getModifierSelector<IModifier>('with-error', root)]: {
        color: tokens.supportingText.color.normal.error,
      },
      [getModifierSelector<IModifier>('focused', root)]: {
        color: tokens.supportingText.color.focused.regular,
      },
      [getModifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        color: tokens.supportingText.color.focused.error,
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: tokens.supportingText.color.hovered.regular,
      },
      [getModifierSelector<IModifier>(['hovered', 'with-error'], root)]: {
        color: tokens.supportingText.color.hovered.error,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.supportingText.color.disabled,
        opacity: tokens.supportingText.opacity.disabled,
      },
    },
  }),
  counter: {
    whiteSpace: 'nowrap',
  },
  icon: {
    color: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  icon$leading: {
    fontSize: tokens.leadingIcon.size,
    width: tokens.leadingIcon.size,
    height: tokens.leadingIcon.size,
  },
  icon$trailing: {
    fontSize: tokens.trailingIcon.size,
    width: tokens.trailingIcon.size,
    height: tokens.trailingIcon.size,
  },
  outline: {},
  placeholder: ({ root }) => ({
    WebkitTextFillColor: tokens.placeholder.color,
    color: tokens.placeholder.color,
    opacity: 1,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        WebkitTextFillColor: 'currentColor',
        color: 'currentColor',
      },
    },
  }),
  prefix: ({ root }) => ({
    color: tokens.prefix.color,
    textWrap: 'nowrap',
    width: 'min-content',
    paddingInlineEnd: tokens.prefix.trailingSpace,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: 'inherit',
      },
    },
  }),
  suffix: ({ root }) => ({
    color: tokens.suffix.color,
    textWrap: 'nowrap',
    width: 'min-content',
    paddingInlineStart: tokens.suffix.leadingSpace,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: 'inherit',
      },
    },
  }),
  inputWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    display: 'flex',
    height: '100%',
  },
});

export type IFieldBaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IFieldBaseVariant;
}>;

export const fieldBaseTheme = componentThemeFactory<IFieldBaseThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const fieldBaseThemeVariants = {
  filled: createStyles({
    root: {
      vars: createTokensVars(tokens, {
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
    container: {
      selectors: {
        [getModifierSelector<IModifier>('resizable')]: {
          // Move the container up so that the resize handle doesn't overlap the
          // focus
          // indicator. Content is moved back the opposite direction.
          bottom: tokens.activeIndicator.height.focused,
          // Ensures the container doesn't create an overhang that can be
          // clicked on.
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
    activeIndicator: {
      inset: 'auto 0 0 0',
      // Prevent click events on the indicator element since it has no width and
      // causes bugs when handled by the foundation for updating
      // transform-origin.
      pointerEvents: 'none',
      position: 'absolute',
      width: '100%',
      zIndex: 1,
    },
    activeIndicatorBackground: ({ root }) => ({
      inset: 'auto 0 0 0',
      position: 'absolute',
      width: '100%',
      borderBottomStyle: 'solid',
      borderBottomWidth: tokens.activeIndicator.height.normal,
      borderBottomColor: tokens.activeIndicator.color.normal.regular,

      selectors: {
        [getModifierSelector<IModifier>(['!focused', 'hovered'], root)]: {
          borderBottomWidth: tokens.activeIndicator.height.hovered,
          borderBottomColor: tokens.activeIndicator.color.hovered.regular,
        },
        [getModifierSelector<IModifier>(['with-error'], root)]: {
          borderBottomColor: tokens.activeIndicator.color.normal.error,
        },
        [getModifierSelector<IModifier>(
          ['with-error', '!focused', 'hovered'],
          root,
        )]: {
          borderBottomColor: tokens.activeIndicator.color.hovered.error,
        },
        [getModifierSelector<IModifier>('disabled', root)]: {
          borderBottomWidth: tokens.activeIndicator.height.disabled,
          borderBottomColor: tokens.activeIndicator.color.disabled,
          opacity: tokens.activeIndicator.opacity.disabled,
        },
      },
    }),
    activeIndicatorFocus: ({ root }) => ({
      inset: 'auto 0 0 0',
      position: 'absolute',
      width: '100%',
      borderBottomStyle: 'solid',
      transitionProperty: 'opacity',
      transitionDuration: themeTokens.motion.duration.short.$3,
      transitionTimingFunction: themeTokens.motion.easing.standard.normal,
      borderBottomWidth: tokens.activeIndicator.height.focused,
      borderBottomColor: tokens.activeIndicator.color.focused.regular,
      opacity: 0,

      selectors: {
        [getModifierSelector<IModifier>('focused', root)]: {
          opacity: 1,
        },
        [getModifierSelector<IModifier>(['focused', 'with-error'], root)]: {
          borderBottomColor: tokens.activeIndicator.color.focused.error,
        },
      },
    }),
    labelWrapper: ({ root }) => ({
      selectors: {
        [getModifierSelector<IModifier>('!with-start-section', root)]: {
          marginInlineStart: tokens.leadingSpace,
        },
        [getModifierSelector<IModifier>('!with-end-section', root)]: {
          marginInlineEnd: tokens.trailingSpace,
        },
      },
    }),
    contentSlot: ({ root }) => ({
      selectors: {
        [getModifierSelector<IModifier>('!with-start-section', root)]: {
          paddingInlineStart: tokens.leadingSpace,
        },
        [getModifierSelector<IModifier>('!with-end-section', root)]: {
          paddingInlineEnd: tokens.trailingSpace,
        },
        [getModifierSelector<IModifier>(['with-label', '!multiline'], root)]: {
          paddingTop: calc.add(
            tokens.topSpace.withLabel,
            calc.multiply(
              tokens.label.typography.floating.lineHeight,
              themeTokens.scale,
            ),
          ),
          paddingBottom: tokens.bottomSpace.withLabel,
        },
        [getModifierSelector<IModifier>(['with-label', 'multiline'], root)]: {
          marginTop: calc.add(
            tokens.topSpace.withLabel,
            calc.multiply(
              tokens.label.typography.floating.lineHeight,
              themeTokens.scale,
            ),
          ),
          marginBottom: tokens.bottomSpace.withLabel,
        },
      },
    }),
    label$floating: {
      position: 'absolute',
      top: tokens.topSpace.withLabel,
    },
  }),
  outlined: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          shape: {
            topLeft: px(themeTokens.shape.corner.xs),
            topRight: px(themeTokens.shape.corner.xs),
            bottomRight: px(themeTokens.shape.corner.xs),
            bottomLeft: px(themeTokens.shape.corner.xs),
          },
        },
      }),
    },
    outline: {
      vars: createTokensVars(FieldBaseOutline.theme.tokens, {
        leadingSpace: tokens.leadingSpace,
        trailingSpace: tokens.trailingSpace,
        label: {
          padding: tokens.label.padding,
        },
      }),
    },
    contentSlot: ({ root }) => ({
      selectors: {
        [getModifierSelector<IModifier>('!with-start-section', root)]: {
          paddingInlineStart: `max(${tokens.leadingSpace}, ${tokens.label.padding})`,
        },
      },
    }),
    labelWrapper: ({ root }) => ({
      selectors: {
        [getModifierSelector<IModifier>('!with-start-section', root)]: {
          paddingInlineStart: `max(${tokens.leadingSpace}, ${tokens.label.padding})`,
        },
      },
    }),
  }),
};
