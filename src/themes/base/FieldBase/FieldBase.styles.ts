import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IFieldBaseStyleKey } from '@/components/atoms/FieldBase';
import { componentVars as vars } from '../TextField/TextField.stylex';
import { motionVars } from '../vars/motion.stylex';

// Duration of the label animation.
const labelDuration = motionVars.duration$short3;
// Duration of the content's visibility animation.
const visibleDuration = `calc(${labelDuration} * 5 / 9)`;
// Short delay when entering (focusing/populating) so that the label may move
// out of the way before the content starts to appear.
const enterDelay = `calc(${labelDuration} - ${visibleDuration})`;

type IFieldBaseStyles = IStyles<IFieldBaseStyleKey>;
export const styles: MapNamespaces<IFieldBaseStyles> =
  stylex.create<IFieldBaseStyles>({
    // https://github.com/material-components/material-web/blob/main/field/internal/_shared.scss
    host: {
      display: 'flex',
      resize: 'inherit',
      minHeight: 56,
      width: '100%',
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
    // A separate wrapper is needed around the container for the outline, whose
    // floating label needs overflow: visible. The container itself needs
    // overflow: hidden when resizable.
    containerOverflow: {
      resize: 'inherit',
      borderRadius: vars.containerShape,
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
      justifyContent: 'center',

      color: {
        default: vars.leadingContentColor,
        ':is([data-focused])': vars.leadingContentColor$focus,
        ':is([data-hovered])': vars.leadingContentColor$hover,
      },
    },
    section$start$disabled: {
      color: vars.leadingContentColor$disabled,
      opacity: vars.leadingContentOpacity$disabled,
    },
    section$start$withStart: {
      minWidth: vars.leadingContentMinWidth,
      marginInlineEnd: 4,
    },
    section$start$error: {
      color: {
        default: vars.leadingContentColor$error,
        ':is([data-focused])': vars.leadingContentColor$error$focus,
        ':is(:not([data-focused])[data-hovered])':
          vars.leadingContentColor$error$hover,
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
      justifyContent: 'center',

      color: {
        default: vars.trailingContentColor,
        ':is([data-focused])': vars.trailingContentColor$focus,
        ':is(:not([data-focused])[data-hovered])':
          vars.trailingContentColor$hover,
      },
    },
    section$end$disabled: {
      color: vars.trailingContentColor$disabled,
      opacity: vars.trailingContentOpacity$disabled,
    },
    section$end$withEnd: {
      minWidth: vars.trailingContentMinWidth,
      marginInlineStart: 4,
    },
    section$end$error: {
      color: {
        default: vars.trailingContentColor$error,
        ':is([data-focused])': vars.trailingContentColor$error$focus,
        ':is(:not([data-focused])[data-hovered])':
          vars.trailingContentColor$error$hover,
      },
    },
    content: {
      display: 'flex',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '0%',
      transitionProperty: 'opacity',
      transitionDuration: visibleDuration,
      transitionTimingFunction: motionVars.easing$emphasized,

      // Used to set the color of autofilled text in Chrome.
      WebkitTextFillColor: {
        default: vars.contentColor,
        ':is([data-focused])': vars.contentColor$focus,
        ':is(:not([data-focused])[data-hovered])': vars.contentColor$hover,
      },
      color: {
        default: vars.contentColor,
        ':is([data-focused])': vars.contentColor$focus,
        ':is(:not([data-focused])[data-hovered])': vars.contentColor$hover,
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
      color: vars.contentColor$disabled,

      opacity: {
        default: 0,
        ':is([data-focused])': vars.contentOpacity$disabled,
      },
    },
    content$noLabel: {
      opacity: 1,
      transitionDelay: enterDelay,
    },
    content$noLabel$disabled: {
      opacity: vars.contentOpacity$disabled,
    },
    content$populated: {
      opacity: 1,
      transitionDelay: enterDelay,
    },
    content$populated$disabled: {
      opacity: vars.contentOpacity$disabled,
    },
    content$error: {
      color: {
        default: vars.contentColor$error,
        ':is([data-focused])': vars.contentColor$error$focus,
        ':is(:not([data-focused])[data-hovered])':
          vars.contentColor$error$hover,
      },
    },
    contentSlot: {
      // all: 'unset',
      // Use `currentColor` to inherit the various state colors that are set
      // below.
      color: 'currentColor',
      fontFamily: vars.contentFont,
      fontSize: vars.contentSize,
      fontWeight: vars.contentWeight,
      lineHeight: vars.contentLineHeight,
      letterSpacing: vars.contentLetterSpacing,
      width: '100%',
      // Reverting values before "all: unset"
      overflowWrap: 'revert', // Neceded to break words in textarea
      whiteSpace: 'revert', // Needed for Firefox textarea

      paddingTop: vars.topSpace,
      paddingBottom: vars.bottomSpace,
    },
    contentSlot$textarea: {
      paddingTop: 0,
      paddingBottom: 0,

      // Use margin for textareas since they will scroll over the label if not.
      marginTop: vars.topSpace,
      marginBottom: vars.bottomSpace,
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
    prefix: {
      color: vars.contentPrefixColor,
      textWrap: 'nowrap',
      width: 'min-content',
      paddingInlineEnd: vars.contentPrefixTrailingSpace,
    },
    prefix$disabled: {
      color: 'inherit',
    },
    suffix: {
      color: vars.contentSuffixColor,
      textWrap: 'nowrap',
      width: 'min-content',
      paddingInlineStart: vars.contentSuffixLeadingSpace,
    },
    suffix$disabled: {
      color: 'inherit',
    },
    label: {
      overflow: 'hidden',
      maxWidth: '100%',
      // Check with design, should there be any transition from resting to
      // floating when there is a mismatch between ellipsis, such as opacity
      // transition?
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      zIndex: 1,
      fontFamily: vars.labelTextFont,
      fontSize: vars.labelTextSize,
      lineHeight: vars.labelTextLineHeight,
      fontWeight: vars.labelTextWeight,
      letterSpacing: vars.labelTextLetterSpacing,
      width: 'min-content',

      color: {
        default: vars.labelTextColor,
        ':is([data-focused])': vars.labelTextColor$focus,
        ':is(:not([data-focused])[data-hovered])': vars.labelTextColor$hover,
      },
    },
    label$disabled: {
      color: vars.labelTextColor$disabled,
      opacity: vars.labelTextOpacity$disabled,
    },
    label$error: {
      color: {
        default: vars.labelTextColor$error,
        ':is([data-focused])': vars.labelTextColor$error$focus,
        ':is(:not([data-focused])[data-hovered])':
          vars.labelTextColor$error$hover,
      },
    },
    label$resting: {
      position: 'absolute',
      top: vars.topSpace,
    },
    label$floating: {
      fontSize: vars.labelTextPopulatedSize,
      lineHeight: vars.labelTextPopulatedLineHeight,
      transformOrigin: 'top left',
    },
    label$invisible: {
      visibility: 'hidden',
    },

    // https://github.com/material-components/material-web/blob/main/field/internal/_supporting-text.scss
    supportingText: {
      display: 'flex',
      fontFamily: vars.supportingTextFont,
      fontSize: vars.supportingTextSize,
      fontWeight: vars.supportingTextWeight,
      lineHeight: vars.supportingTextLineHeight,
      letterSpacing: vars.supportingTextLetterSpacing,
      gap: 16,
      justifyContent: 'space-between',
      paddingInlineStart: vars.supportingTextLeadingSpace,
      paddingInlineEnd: vars.supportingTextTrailingSpace,
      paddingTop: vars.supportingTextTopSpace,

      // Don't shrink the counter when the supporting text is long and wraps
      flexShrink: {
        ':nth-child(2)': 0,
      },

      color: {
        default: vars.supportingTextColor,
        ':is([data-focused])': vars.supportingTextColor$focus,
        ':is(:not([data-focused])[data-hovered])':
          vars.supportingTextColor$hover,
      },
    },
    supportingText$disabled: {
      color: vars.supportingTextColor$disabled,
      opacity: vars.supportingTextOpacity$disabled,
    },
    supportingText$error: {
      color: {
        default: vars.supportingTextColor$error,
        ':is([data-focused])': vars.supportingTextColor$error$focus,
        ':is(:not([data-focused])[data-hovered])':
          vars.supportingTextColor$error$hover,
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
    },
    icon$leading: {
      fontSize: vars.leadingIconSize,
      width: vars.leadingIconSize,
      height: vars.leadingIconSize,
    },
    icon$trailing: {
      fontSize: vars.trailingIconSize,
      width: vars.trailingIconSize,
      height: vars.trailingIconSize,
    },
    inputWrapper: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '0%',
      display: 'flex',
    },
  });
