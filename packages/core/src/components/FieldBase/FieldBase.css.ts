import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IFieldBaseVariant } from './FieldBase.types';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { COMPONENT_NAME } from './FieldBase.constants';

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
const LABEL_ANIMATION_DURATION = themeTokens.motion.duration.short3;
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

const DENSITY = px(density({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  minHeight: px(56),
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
  stateLayer: {
    color: {
      hovered: {
        regular: themeTokens.colorScheme.onSurface,
        error: themeTokens.colorScheme.onSurface,
      },
      pressed: {
        regular: 'none',
        error: 'none',
      },
    },
    opacity: {
      hovered: {
        regular: themeTokens.state.stateLayerOpacity.hovered,
        error: themeTokens.state.stateLayerOpacity.hovered,
      },
      pressed: {
        regular: themeTokens.state.stateLayerOpacity.hovered,
        error: themeTokens.state.stateLayerOpacity.hovered,
      },
    },
  },
  selection: {
    color: 'inherit',
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
        regular: themeTokens.colorScheme.primary,
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
  outline: {
    leadingSpace: px(space(4)),
    trailingSpace: px(space(4)),
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
      normal: px(themeTokens.outline.width.xs),
      focused: px(themeTokens.outline.width.md),
      hovered: px(themeTokens.outline.width.xs),
      disabled: px(themeTokens.outline.width.xs),
    },
    label: {
      padding: px(space(1)),
      bottomSpace: px(space(2)),
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
      [modifierSelector<IModifier>('disabled')]: {
        cursor: 'default',
        pointerEvents: 'none',
      },
      [modifierSelector<IModifier>('hovered')]: {
        cursor: 'pointer',
      },
    },
  },
  container: ({ root }) => ({
    position: 'relative',
    resize: 'inherit',
    width: 'inherit',
    display: 'flex',
    height: '100%',

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: 'inherit',
        shape: `${px(themeTokens.shape.corner.xs)} ${px(themeTokens.shape.corner.xs)} 0 0`,
      },
    }),
    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: themeTokens.colorScheme.onSurface,
            opacity: themeTokens.state.containerOpacity.disabled,
          },
        }),
      },
    },
  }),
  inner: ({ root }) => ({
    alignItems: 'center',
    borderRadius: 'inherit',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    minHeight: calc.add(tokens.minHeight, DENSITY),
    maxHeight: '100%',
    minWidth: 'min-content',
    position: 'relative',

    selectors: {
      [modifierSelector<IModifier>(['resizable', '!disabled'], root)]: {
        // `resize` is inherited from the host, but only applies to the
        // container when resizable.
        resize: 'inherit',
        // Overflow is visible when not resizable to allow overflowing content
        // such as popups or icon focus rings. Resizable fields cannot display
        // overflowing content due to `resize` not allowing it.
        overflow: 'hidden',
      },
      [modifierSelector<IModifier>('disabled')]: {
        resize: 'none',
        overflow: 'visible',
      },
    },
  }),
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
      [modifierSelector<IModifier>('with-error', root)]: {
        color: tokens.leadingContent.color.normal.error,
      },
      [modifierSelector<IModifier>('focused', root)]: {
        color: tokens.leadingContent.color.focused.regular,
      },
      [modifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        color: tokens.leadingContent.color.focused.error,
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        color: tokens.leadingContent.color.hovered.regular,
      },
      [modifierSelector<IModifier>(['hovered', 'with-error'], root)]: {
        color: tokens.leadingContent.color.hovered.error,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
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
      [modifierSelector<IModifier>('with-error', root)]: {
        color: tokens.trailingContent.color.normal.error,
      },
      [modifierSelector<IModifier>('focused', root)]: {
        color: tokens.trailingContent.color.focused.regular,
      },
      [modifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        color: tokens.trailingContent.color.focused.error,
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        color: tokens.trailingContent.color.hovered.regular,
      },
      [modifierSelector<IModifier>(['hovered', 'with-error'], root)]: {
        color: tokens.trailingContent.color.hovered.error,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
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
    ...typography(tokens.label.typography.resting),
    width: 'min-content',
    color: tokens.label.color.normal.regular,

    selectors: {
      [modifierSelector<IModifier>('with-error', root)]: {
        color: tokens.label.color.normal.error,
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        color: tokens.label.color.hovered.regular,
      },
      [modifierSelector<IModifier>(['hovered', 'with-error'], root)]: {
        color: tokens.label.color.hovered.error,
      },
      [modifierSelector<IModifier>('focused', root)]: {
        color: tokens.label.color.focused.regular,
      },
      [modifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        color: tokens.label.color.focused.error,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
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
    ...typography(tokens.label.typography.floating),
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
      [modifierSelector<IModifier>('with-error', root)]: {
        color: tokens.content.color.focused.error,
        WebkitTextFillColor: tokens.content.color.focused.error,
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        color: tokens.content.color.hovered.regular,
        WebkitTextFillColor: tokens.content.color.hovered.regular,
      },
      [modifierSelector<IModifier>(['hovered', 'with-error'], root)]: {
        color: tokens.content.color.hovered.error,
        WebkitTextFillColor: tokens.content.color.hovered.error,
      },
      [modifierSelector<IModifier>('focused', root)]: {
        color: tokens.content.color.focused.regular,
        WebkitTextFillColor: tokens.content.color.focused.regular,
      },
      [modifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        color: tokens.content.color.focused.error,
        WebkitTextFillColor: tokens.content.color.focused.error,
      },
      [[
        modifierSelector<IModifier>('focused', root),
        modifierSelector<IModifier>('!with-label', root),
        modifierSelector<IModifier>('populated', root),
      ].join(', ')]: {
        opacity: 1,
        transitionDelay: ENTER_DELAY,
      },
      [[
        modifierSelector<IModifier>(['!with-label', 'disabled'], root),
        modifierSelector<IModifier>(['populated', 'disabled'], root),
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
    ...typography(tokens.content.typography),
    width: '100%',
    // Reverting values before "all: unset"
    overflowWrap: 'revert', // Needed to break words in textarea
    whiteSpace: 'revert', // Needed for Firefox textarea
    alignItems: 'center',
    flexWrap: 'wrap', // To make the input/textarea go to new line when needed

    selectors: {
      [modifierSelector<IModifier>('!multiline', root)]: {
        paddingTop: tokens.topSpace.normal,
        paddingBottom: tokens.bottomSpace.normal,
      },
      [modifierSelector<IModifier>('multiline', root)]: {
        // Use margin for textareas since they will scroll over the label if
        // not.
        marginTop: tokens.topSpace.normal,
        marginBottom: tokens.bottomSpace.normal,
      },
      [modifierSelector<IModifier>('!with-end-section', root)]: {
        paddingInlineEnd: tokens.trailingSpace,
      },
    },
  }),
  stateLayer: ({ root }) => ({
    vars: overrideTokens(StateLayer.theme.tokens, {
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
      [modifierSelector<IModifier>('with-error', root)]: {
        vars: overrideTokens(StateLayer.theme.tokens, {
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
    ...typography(tokens.supportingText.typography),
    gap: px(space(4)),
    justifyContent: 'space-between',
    paddingInlineStart: tokens.supportingText.leadingSpace,
    paddingInlineEnd: tokens.supportingText.trailingSpace,
    paddingTop: tokens.supportingText.topSpace,
    color: tokens.supportingText.color.normal.regular,

    selectors: {
      [modifierSelector<IModifier>('with-error', root)]: {
        color: tokens.supportingText.color.normal.error,
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        color: tokens.supportingText.color.hovered.regular,
      },
      [modifierSelector<IModifier>(['hovered', 'with-error'], root)]: {
        color: tokens.supportingText.color.hovered.error,
      },
      [modifierSelector<IModifier>('focused', root)]: {
        color: tokens.supportingText.color.focused.regular,
      },
      [modifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        color: tokens.supportingText.color.focused.error,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
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
    height: tokens.leadingIcon.size,
    minWidth: tokens.leadingIcon.size,
  },
  icon$trailing: {
    fontSize: tokens.trailingIcon.size,
    height: tokens.trailingIcon.size,
    minWidth: tokens.trailingIcon.size,
    justifySelf: 'end',
  },
  prefix: ({ root }) => ({
    color: tokens.prefix.color,
    textWrap: 'nowrap',
    width: 'min-content',
    paddingInlineEnd: tokens.prefix.trailingSpace,
    // Do not take prefix height into account for the field's height. This is
    // important when the density is increased.
    height: 0,
    display: 'flex',
    alignItems: 'center',

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        color: 'inherit',
      },
    },
  }),
  suffix: ({ root }) => ({
    color: tokens.suffix.color,
    textWrap: 'nowrap',
    width: 'min-content',
    paddingInlineStart: tokens.suffix.leadingSpace,
    // Do not take suffix height into account for the field's height. This is
    // important when the density is increased.
    height: 0,
    display: 'flex',
    alignItems: 'center',

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        color: 'inherit',
      },
    },
  }),
  inputWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    minWidth: px(48),
    position: 'relative',

    flexWrap: 'wrap',
    flexDirection: 'row',
    rowGap: px(4),
  },
  outline: ({ root }) => ({
    borderRadius: 'inherit',
    display: 'flex',
    // Allow events to target elements underneath the outline, such as icons.
    pointerEvents: 'none',
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    borderColor: tokens.outline.color.normal.regular,
    // Needed for Firefox HCM
    color: tokens.outline.color.normal.regular,

    selectors: {
      [modifierSelector<IModifier>('with-error', root)]: {
        borderColor: tokens.outline.color.normal.error,
        color: tokens.outline.color.normal.error,
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        borderColor: tokens.outline.color.hovered.regular,
        color: tokens.outline.color.hovered.regular,
      },
      [modifierSelector<IModifier>(['hovered', 'with-error'], root)]: {
        borderColor: tokens.outline.color.hovered.error,
        color: tokens.outline.color.hovered.error,
      },
      [modifierSelector<IModifier>('focused', root)]: {
        borderColor: tokens.outline.color.focused.regular,
        color: tokens.outline.color.focused.regular,
      },
      [modifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        borderColor: tokens.outline.color.focused.error,
        color: tokens.outline.color.focused.error,
      },
      [modifierSelector<IModifier>('pressed', root)]: {
        borderColor: tokens.outline.color.focused.regular,
        color: tokens.outline.color.focused.regular,
      },
      [modifierSelector<IModifier>(['pressed', 'with-error'], root)]: {
        borderColor: tokens.outline.color.focused.error,
        color: tokens.outline.color.focused.error,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        borderColor: tokens.outline.color.disabled,
        color: tokens.outline.color.disabled,
      },
    },
  }),
  outlineSection$startEnd: ({ root }) => ({
    borderWidth: 'inherit',
    borderStyle: 'inherit',
    borderColor: 'inherit',
    borderRadius: 'inherit',
    position: 'relative',

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        opacity: tokens.outline.opacity.disabled,
      },
    },
  }),
  outlineSection$start: {
    // Add padding that will grow to compensate for the outline's shape. This is
    // needed to prevent the outline border from clipping with the label and is
    // mirrored in the container padding to align the content and resting label
    // with the adjusted floating label.
    paddingInlineStart: `max(${tokens.outline.leadingSpace}, ${tokens.outline.label.padding})`,
  },
  outlineSection$end: {
    flexGrow: 1,
    marginInlineStart: calc.negate(tokens.outline.label.padding),
  },
  outlineSection$panel: {
    borderWidth: 'inherit',
    borderColor: 'inherit',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'none',
    inset: 0,
    position: 'absolute',
  },
  outlineSection$panel$inactive: ({ root }) => ({
    borderWidth: tokens.outline.width.normal,

    selectors: {
      [modifierSelector<IModifier>('hovered', root)]: {
        borderWidth: tokens.outline.width.hovered,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        borderWidth: tokens.outline.width.disabled,
        opacity: tokens.outline.opacity.disabled,
      },
    },
  }),
  outlineSection$panel$active: ({ root }) => ({
    transitionProperty: 'opacity',
    transitionDuration: themeTokens.motion.duration.short3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    borderWidth: tokens.outline.width.focused,
    opacity: 0,

    selectors: {
      [modifierSelector<IModifier>('focused', root)]: {
        opacity: 1,
      },
      [modifierSelector<IModifier>('pressed', root)]: {
        opacity: 1,
      },
    },
  }),
  outlineBorder: {
    borderWidth: 'inherit',
    borderStyle: 'inherit',
    borderColor: 'inherit',
    inset: 0,
    position: 'absolute',
  },
  outlineBorder$startEnd: {
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
  },
  outlineBorder$start: {
    borderInlineStartStyle: 'solid',
    borderInlineEndStyle: 'none',
    borderStartStartRadius: 'inherit',
    borderStartEndRadius: 0,
    borderEndStartRadius: 'inherit',
    borderEndEndRadius: 0,
    marginInlineEnd: tokens.outline.label.padding,
  },
  outlineBorder$inactive$startEnd: ({ root }) => ({
    borderWidth: tokens.outline.width.normal,

    selectors: {
      [modifierSelector<IModifier>('hovered', root)]: {
        borderWidth: tokens.outline.width.hovered,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        borderWidth: tokens.outline.width.disabled,
      },
    },
  }),
  outlineBorder$active$startEnd: ({ root }) => ({
    transitionProperty: 'opacity',
    transitionDuration: themeTokens.motion.duration.short3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    borderWidth: tokens.outline.width.focused,
    opacity: 0,

    selectors: {
      [modifierSelector<IModifier>('focused', root)]: {
        opacity: 1,
      },
      [modifierSelector<IModifier>('pressed', root)]: {
        opacity: 1,
      },
    },
  }),
  outlineBorder$active$panel$active: {
    borderWidth: tokens.outline.width.focused,
  },
  outlineBorder$panel: ({ root }) => ({
    borderTopStyle: 'solid',
    borderBottomStyle: 'unset',
    bottom: 'auto',
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    transform: 'scaleX(1)',

    selectors: {
      [[
        modifierSelector<IModifier>('focused', root),
        modifierSelector<IModifier>('populated', root),
      ].join(', ')]: {
        transform: 'scaleX(0)',
      },
    },
  }),
  outlineBorder$inactive$panel: {
    // Note: no need to do any RTL flipping here. If RTLCSS flips this, it's
    // also ok, we just need one to be left and one to be right.
    right: '50%',
    transformOrigin: 'top left',
  },
  outlineBorder$inactive$panel$active: {
    borderWidth: tokens.outline.width.focused,
  },
  outlineBorder$inactive$panel$inactive: ({ root }) => ({
    borderWidth: tokens.outline.width.normal,

    selectors: {
      [modifierSelector<IModifier>('hovered', root)]: {
        borderWidth: tokens.outline.width.hovered,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        borderWidth: tokens.outline.width.disabled,
      },
      [modifierSelector<IModifier>('populated', root)]: {
        transform: 'scaleX(0)',
      },
    },
  }),
  outlineBorder$active$panel: {
    // Note: no need to do any RTL flipping here. If RTLCSS flips this, it's
    // also ok, we just need one to be left and one to be right.
    left: '50%',
    transformOrigin: 'top right',
  },
  outlineBorder$active$panel$inactive: ({ root }) => ({
    borderWidth: tokens.outline.width.normal,

    selectors: {
      [modifierSelector<IModifier>('hovered', root)]: {
        borderWidth: tokens.outline.width.hovered,
      },
    },
  }),
  outlineBorder$end: {
    borderInlineStartStyle: 'none',
    borderInlineEndStyle: 'solid',
    borderStartStartRadius: 0,
    borderStartEndRadius: 'inherit',
    borderEndStartRadius: 0,
    borderEndEndRadius: 'inherit',
  },
  outlineNotch: ({ root }) => ({
    alignItems: 'flex-start',
    borderWidth: 'inherit',
    borderStyle: 'inherit',
    borderColor: 'inherit',
    display: 'flex',
    marginInlineStart: calc.negate(tokens.outline.label.padding),
    marginInlineEnd: tokens.outline.label.padding,
    maxWidth: calc.subtract(
      '100%',
      tokens.outline.leadingSpace,
      tokens.outline.trailingSpace,
    ),
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: tokens.outline.label.padding,
    paddingRight: tokens.outline.label.padding,
    position: 'relative',

    selectors: {
      [modifierSelector<IModifier>('!with-label', root)]: {
        display: 'none',
      },
    },
  }),
  outlineLabel: {
    display: 'flex',
    maxWidth: '100%',
    // Center the floating label within the outline stroke
    transform: `translateY(${calc.add('-100%', tokens.outline.label.bottomSpace)})`,
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
      selectors: {
        [modifierSelector<IModifier>('disabled')]: {
          vars: overrideTokens(PaperBase.theme.tokens, {
            container: {
              opacity: '0.04',
            },
          }),
        },
      },
    },
    container: {
      vars: overrideTokens(PaperBase.theme.tokens, {
        container: {
          color: themeTokens.colorScheme.surfaceContainerHighest,
        },
      }),
    },
    inner: ({ root }) => ({
      selectors: {
        [modifierSelector<IModifier>('resizable', root)]: {
          // Move the container up so that the resize handle doesn't overlap the
          // focus indicator. Content is moved back the opposite direction.
          bottom: tokens.activeIndicator.height.focused,
          // Ensures the container doesn't create an overhang that can be
          // clicked on.
          clipPath: `inset(${tokens.activeIndicator.height.focused} 0 0 0)`,
        },
      },
    }),
    section: ({ root }) => ({
      selectors: {
        [modifierSelector<IModifier>('resizable', root)]: {
          top: tokens.activeIndicator.height.focused,
        },
      },
    }),
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
        [modifierSelector<IModifier>(['!focused', 'hovered'], root)]: {
          borderBottomWidth: tokens.activeIndicator.height.hovered,
          borderBottomColor: tokens.activeIndicator.color.hovered.regular,
        },
        [modifierSelector<IModifier>(['with-error'], root)]: {
          borderBottomColor: tokens.activeIndicator.color.normal.error,
        },
        [modifierSelector<IModifier>(
          ['with-error', '!focused', 'hovered'],
          root,
        )]: {
          borderBottomColor: tokens.activeIndicator.color.hovered.error,
        },
        [modifierSelector<IModifier>('disabled', root)]: {
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
      transitionDuration: themeTokens.motion.duration.short3,
      transitionTimingFunction: themeTokens.motion.easing.standard.normal,
      borderBottomWidth: tokens.activeIndicator.height.focused,
      borderBottomColor: tokens.activeIndicator.color.focused.regular,
      opacity: 0,

      selectors: {
        [modifierSelector<IModifier>('focused', root)]: {
          opacity: 1,
        },
        [modifierSelector<IModifier>('pressed', root)]: {
          opacity: 1,
        },
        [modifierSelector<IModifier>(['focused', 'with-error'], root)]: {
          borderBottomColor: tokens.activeIndicator.color.focused.error,
        },
        [modifierSelector<IModifier>(['pressed', 'with-error'], root)]: {
          borderBottomColor: tokens.activeIndicator.color.focused.error,
        },
      },
    }),
    labelWrapper: ({ root }) => ({
      selectors: {
        [modifierSelector<IModifier>('!with-start-section', root)]: {
          marginInlineStart: tokens.leadingSpace,
        },
        [modifierSelector<IModifier>('!with-end-section', root)]: {
          marginInlineEnd: tokens.trailingSpace,
        },
      },
    }),
    contentSlot: ({ root }) => ({
      selectors: {
        [modifierSelector<IModifier>('!with-start-section', root)]: {
          paddingInlineStart: tokens.leadingSpace,
        },
        [modifierSelector<IModifier>('!with-end-section', root)]: {
          paddingInlineEnd: tokens.trailingSpace,
        },
        [modifierSelector<IModifier>(['with-label', '!multiline'], root)]: {
          paddingTop: calc.add(
            tokens.topSpace.withLabel,
            calc.multiply(
              tokens.label.typography.floating.lineHeight,
              themeTokens.scale,
            ),
          ),
          paddingBottom: tokens.bottomSpace.withLabel,
        },
        [modifierSelector<IModifier>(['with-label', 'multiline'], root)]: {
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
      selectors: {
        [modifierSelector<IModifier>('disabled')]: {
          vars: overrideTokens(PaperBase.theme.tokens, {
            container: {
              color: 'unset',
            },
          }),
        },
      },
    },
    container: {
      vars: overrideTokens(PaperBase.theme.tokens, {
        container: {
          color: 'transparent',
          shape: px(themeTokens.shape.corner.xs),
        },
      }),
    },
    stateLayer: {
      vars: overrideTokens(StateLayer.theme.tokens, {
        color: {
          hovered: 'unset',
          pressed: 'unset',
        },
      }),
    },
    inner: ({ root }) => ({
      selectors: {
        [modifierSelector<IModifier>('resizable', root)]: {
          // Move the container up and to the left so that the resize handle doesn't
          // overlap the focus outline. Content is moved back the opposite direction.
          bottom: tokens.outline.width.focused,
          insetInlineEnd: tokens.outline.width.focused,
          // Ensures the container doesn't create an overhang that can be clicked on.
          clipPath: `inset(${tokens.outline.width.focused} 0 0 ${tokens.outline.width.focused})`,
        },
      },
    }),
    section: ({ root }) => ({
      selectors: {
        [modifierSelector<IModifier>('resizable', root)]: {
          top: tokens.outline.width.focused,
          insetInlineStart: tokens.outline.width.focused,
        },
      },
    }),
    outline: {
      vars: overrideTokens(tokens.outline, {
        leadingSpace: tokens.leadingSpace,
        trailingSpace: tokens.trailingSpace,
        label: {
          padding: tokens.label.padding,
        },
      }),
    },
    contentSlot: ({ root }) => ({
      selectors: {
        [modifierSelector<IModifier>('!with-start-section', root)]: {
          paddingInlineStart: `max(${tokens.leadingSpace}, ${tokens.label.padding})`,
        },
      },
    }),
    labelWrapper: ({ root }) => ({
      selectors: {
        [modifierSelector<IModifier>('!with-start-section', root)]: {
          paddingInlineStart: `max(${tokens.leadingSpace}, ${tokens.label.padding})`,
        },
      },
    }),
  }),
};
