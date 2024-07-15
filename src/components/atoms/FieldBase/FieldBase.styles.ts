import stylex from '@stylexjs/stylex';

import { motionTokens } from '@/themes/base/motion.stylex';
import { fieldBaseTokens } from './FieldBase.stylex';

// Duration of the label animation.
const labelDuration = motionTokens.duration$short3;
// Duration of the content's visibility animation.
const visibleDuration = `calc(${labelDuration} * 5 / 9)`;
// Short delay when entering (focusing/populating) so that the label may move
// out of the way before the content starts to appear.
const enterDelay = `calc(${labelDuration} - ${visibleDuration})`;

export type IFieldBaseStylesKey = keyof typeof fieldBaseStyles;
export const fieldBaseStyles = stylex.create({
  // https://github.com/material-components/material-web/blob/main/field/internal/_shared.scss
  host: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'stretch',
    resize: 'inherit',
    minHeight: 56,
    cursor: 'pointer',
  },
  host$withSupportingText: {
    minHeight: 76,
  },
  host$disabled: {
    pointerEvents: 'none',
    cursor: 'default',
  },
  field: {
    resize: 'inherit',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    flexDirection: 'column',
    maxWidth: '100%',
  },
  field$textArea: {},
  field$disabled: {},
  // A separate wrapper is needed around the container for the outline, whose
  // floating label needs overflow: visible. The container itself needs
  // overflow: hidden when resizable.
  containerOverflow: {
    resize: 'inherit',
    borderRadius: fieldBaseTokens.containerShape,
    display: 'flex',
    height: '100%',
    position: 'relative',
  },
  container: {
    alignItems: 'center',
    borderRadius: 'inherit',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    minHeight: '100%',
    maxHeight: '100%',
    minWidth: 'min-content',
    position: 'relative',
  },
  container$resizable: {
    // `resize` is inherited from the host, but only applies to the container
    // when resizable.
    resize: 'inherit',
    // Overflow is visible when not resizable to allow overflowing content such
    // as popups or icon focus rings.
    // Resizable fields cannot display overflowing content due to `resize` not
    // allowing it.
    overflow: 'hidden',
  },
  container$disabled$resizable: {
    resize: 'none',
    overflow: 'visible',
  },

  // https://github.com/material-components/material-web/blob/main/field/internal/_content.scss
  section: {
    display: 'flex',
    height: '100%',
    // Relative position for absolutely positioned labels (to avoid interfering
    // with baseline alignment).
    position: 'relative',
  },
  section$start: {
    alignItems: 'center',
    justifyContent: 'start',
    paddingInlineStart: 8,

    color: {
      default: fieldBaseTokens.leadingContentColor,
      ':is([data-focused])': fieldBaseTokens.leadingContentColor$focus,
      ':is([data-hovered])': fieldBaseTokens.leadingContentColor$hover,
    },
  },
  section$start$disabled: {
    color: fieldBaseTokens.leadingContentColor$disabled,
    opacity: fieldBaseTokens.leadingContentOpacity$disabled,
  },
  section$start$withStart: {
    minWidth: fieldBaseTokens.leadingContentMinWidth,
  },
  section$start$error: {
    color: {
      default: fieldBaseTokens.leadingContentColor$error,
      ':is([data-focused])': fieldBaseTokens.leadingContentColor$error$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.leadingContentColor$error$hover,
    },
  },
  section$middle: {
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
  section$end: {
    alignItems: 'center',
    justifyContent: 'end',
    paddingInlineEnd: 8,

    color: {
      default: fieldBaseTokens.trailingContentColor,
      ':is([data-focused])': fieldBaseTokens.trailingContentColor$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.trailingContentColor$hover,
    },
  },
  section$end$disabled: {
    color: fieldBaseTokens.trailingContentColor$disabled,
    opacity: fieldBaseTokens.trailingContentOpacity$disabled,
  },
  section$end$withEnd: {
    minWidth: fieldBaseTokens.trailingContentMinWidth,
    marginInlineStart: 4,
  },
  section$end$error: {
    color: {
      default: fieldBaseTokens.trailingContentColor$error,
      ':is([data-focused])': fieldBaseTokens.trailingContentColor$error$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.trailingContentColor$error$hover,
    },
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    transitionProperty: 'opacity',
    transitionDuration: visibleDuration,
    transitionTimingFunction: motionTokens.easing$emphasized,

    // Used to set the color of autofilled text in Chrome.
    WebkitTextFillColor: {
      default: fieldBaseTokens.contentColor,
      ':is([data-focused])': fieldBaseTokens.contentColor$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.contentColor$hover,
    },
    color: {
      default: fieldBaseTokens.contentColor,
      ':is([data-focused])': fieldBaseTokens.contentColor$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.contentColor$hover,
    },
    opacity: {
      default: 0,
      ':is([data-focused])': 1,
    },
    transitionDelay: {
      default: 'none',
      ':is([data-focused])': enterDelay,
    },
  },
  content$disabled: {
    transitionProperty: 'none',
    color: fieldBaseTokens.contentColor$disabled,

    opacity: {
      default: 0,
      ':is([data-focused])': fieldBaseTokens.contentOpacity$disabled,
    },
  },
  content$noLabel: {
    opacity: 1,
    transitionDelay: enterDelay,
  },
  content$noLabel$disabled: {
    opacity: fieldBaseTokens.contentOpacity$disabled,
  },
  content$populated: {
    opacity: 1,
    transitionDelay: enterDelay,
  },
  content$populated$disabled: {
    opacity: fieldBaseTokens.contentOpacity$disabled,
  },
  content$error: {
    color: {
      default: fieldBaseTokens.contentColor$error,
      ':is([data-focused])': fieldBaseTokens.contentColor$error$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.contentColor$error$hover,
    },
  },
  contentSlot: {
    // all: 'unset',
    // Use `currentColor` to inherit the various state colors that are set
    // below.
    display: 'flex',
    color: 'currentColor',
    fontFamily: fieldBaseTokens.contentFont,
    fontSize: fieldBaseTokens.contentSize,
    fontWeight: fieldBaseTokens.contentWeight,
    lineHeight: fieldBaseTokens.contentLineHeight,
    letterSpacing: fieldBaseTokens.contentLetterSpacing,
    width: '100%',
    // Reverting values before "all: unset"
    overflowWrap: 'revert', // Needed to break words in textarea
    whiteSpace: 'revert', // Needed for Firefox textarea
    alignItems: 'center',
    flexWrap: 'wrap', // To make the input/textarea go to new line when needed

    paddingTop: fieldBaseTokens.topSpace,
    paddingBottom: fieldBaseTokens.bottomSpace,
  },
  contentSlot$textArea: {
    paddingTop: 0,
    paddingBottom: 0,

    // Use margin for textareas since they will scroll over the label if not.
    marginTop: fieldBaseTokens.topSpace,
    marginBottom: fieldBaseTokens.bottomSpace,
  },

  // https://github.com/material-components/material-web/blob/main/field/internal/_label.scss
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
  labelWrapper$withStart: {},
  labelWrapper$withEnd: {},
  labelWrapper$withoutEnd: {},
  label: {
    overflow: 'hidden',
    maxWidth: '100%',
    // Check with design, should there be any transition from resting to
    // floating when there is a mismatch between ellipsis, such as opacity
    // transition?
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    zIndex: 1,
    fontFamily: fieldBaseTokens.labelTextFont,
    fontSize: fieldBaseTokens.labelTextSize,
    lineHeight: fieldBaseTokens.labelTextLineHeight,
    fontWeight: fieldBaseTokens.labelTextWeight,
    letterSpacing: fieldBaseTokens.labelTextLetterSpacing,
    width: 'min-content',

    color: {
      default: fieldBaseTokens.labelTextColor,
      ':is([data-focused])': fieldBaseTokens.labelTextColor$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.labelTextColor$hover,
    },
  },
  label$disabled: {
    color: fieldBaseTokens.labelTextColor$disabled,
    opacity: fieldBaseTokens.labelTextOpacity$disabled,
  },
  label$error: {
    color: {
      default: fieldBaseTokens.labelTextColor$error,
      ':is([data-focused])': fieldBaseTokens.labelTextColor$error$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.labelTextColor$error$hover,
    },
  },
  label$resting: {
    position: 'absolute',
    insetBlockStart: '50%',
    transform: 'translateY(-50%)',
  },
  label$floating: {
    fontSize: fieldBaseTokens.labelTextPopulatedSize,
    lineHeight: fieldBaseTokens.labelTextPopulatedLineHeight,
    transformOrigin: 'top left',
  },
  label$invisible: {
    visibility: 'hidden',
  },

  // https://github.com/material-components/material-web/blob/main/field/internal/_supporting-text.scss
  supportingText: {
    display: 'flex',
    fontFamily: fieldBaseTokens.supportingTextFont,
    fontSize: fieldBaseTokens.supportingTextSize,
    fontWeight: fieldBaseTokens.supportingTextWeight,
    lineHeight: fieldBaseTokens.supportingTextLineHeight,
    letterSpacing: fieldBaseTokens.supportingTextLetterSpacing,
    gap: 16,
    justifyContent: 'space-between',
    paddingInlineStart: fieldBaseTokens.supportingTextLeadingSpace,
    paddingInlineEnd: fieldBaseTokens.supportingTextTrailingSpace,
    paddingTop: fieldBaseTokens.supportingTextTopSpace,

    // Don't shrink the counter when the supporting text is long and wraps
    flexShrink: {
      ':nth-child(2)': 0,
    },

    color: {
      default: fieldBaseTokens.supportingTextColor,
      ':is([data-focused])': fieldBaseTokens.supportingTextColor$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.supportingTextColor$hover,
    },
  },
  supportingText$disabled: {
    color: fieldBaseTokens.supportingTextColor$disabled,
    opacity: fieldBaseTokens.supportingTextOpacity$disabled,
  },
  supportingText$error: {
    color: {
      default: fieldBaseTokens.supportingTextColor$error,
      ':is([data-focused])': fieldBaseTokens.supportingTextColor$error$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.supportingTextColor$error$hover,
    },
  },
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
    fontSize: fieldBaseTokens.leadingIconSize,
    width: fieldBaseTokens.leadingIconSize,
    height: fieldBaseTokens.leadingIconSize,
  },
  icon$trailing: {
    fontSize: fieldBaseTokens.trailingIconSize,
    width: fieldBaseTokens.trailingIconSize,
    height: fieldBaseTokens.trailingIconSize,
  },
});
