import stylex from '@stylexjs/stylex';

import { fieldBaseTokens } from '@/components/atoms/FieldBase/FieldBase.stylex';
import { textFieldBaseTokens as vars } from './TextFieldBase.stylex';

// https://github.com/material-components/material-web/blob/main/textfield/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/textfield/internal/_input.scss
// https://github.com/material-components/material-web/blob/main/textfield/internal/_icon.scss

export type ITextFieldBaseStylesKey = keyof typeof textFieldBaseStyles;
export const textFieldBaseStyles = stylex.create({
  host: {
    display: 'flex',
    flexGrow: 1,
    outline: 'none',
    resize: 'vertical',
  },
  textField: {
    width: '100%',
    display: 'inline-flex',
    // Note: only inherit default `resize: both` to the field when textarea.
    resize: 'inherit',
  },
  input: {
    overflowWrap: 'inherit',
    whiteSpace: 'inherit',
    resize: 'none',
    minWidth: 30,
    fontFamily: fieldBaseTokens.contentFont,
    fontSize: fieldBaseTokens.contentSize,
    fontWeight: fieldBaseTokens.contentWeight,
    lineHeight: fieldBaseTokens.contentLineHeight,
    letterSpacing: fieldBaseTokens.contentLetterSpacing,

    width: '100%',
    height: '100%',
    caretColor: {
      default: vars.caretColor,
      ':is([data-focused])': vars.caretColor$focus,
    },
    // remove extra height added by horizontal scrollbars
    overflowX: 'hidden',
    textAlign: 'inherit',
    '::placeholder': {
      WebkitTextFillColor: fieldBaseTokens.contentPlaceholderColor,
      color: fieldBaseTokens.contentPlaceholderColor,
      opacity: 1,
    },
    '::selection': {
      backgroundColor: fieldBaseTokens.contentBackground$selection,
      color: fieldBaseTokens.contentColor$selection,
    },
    borderStyle: {
      default: 'unset',
      '::-moz-color-swatch': 'unset',
      '::-webkit-color-swatch': 'unset',
      '::-webkit-color-swatch-wrapper': 'unset',
    },
    padding: {
      default: 0,
      '::-webkit-color-swatch-wrapper': 0,
    },
    color: {
      default: 'inherit',
      '::-webkit-datetime-edit-day-field:focus':
        fieldBaseTokens.contentColor$selection,
      '::-webkit-datetime-edit-month-field:focus':
        fieldBaseTokens.contentColor$selection,
      '::-webkit-datetime-edit-year-field:focus':
        fieldBaseTokens.contentColor$selection,
      '::-webkit-datetime-edit-week-field:focus':
        fieldBaseTokens.contentColor$selection,
      '::-webkit-datetime-edit-hour-field:focus':
        fieldBaseTokens.contentColor$selection,
      '::-webkit-datetime-edit-minute-field:focus':
        fieldBaseTokens.contentColor$selection,
      '::-webkit-datetime-edit-second-field:focus':
        fieldBaseTokens.contentColor$selection,
      '::-webkit-datetime-edit-millisecond-field:focus':
        fieldBaseTokens.contentColor$selection,
      '::-webkit-datetime-edit-ampm-field:focus':
        fieldBaseTokens.contentColor$selection,
    },
    backgroundColor: {
      default: 'inherit',
      // Date input highlight color
      '::-webkit-datetime-edit-day-field:focus':
        fieldBaseTokens.contentBackground$selection,
      '::-webkit-datetime-edit-month-field:focus':
        fieldBaseTokens.contentBackground$selection,
      '::-webkit-datetime-edit-year-field:focus':
        fieldBaseTokens.contentBackground$selection,
      '::-webkit-datetime-edit-week-field:focus':
        fieldBaseTokens.contentBackground$selection,
      '::-webkit-datetime-edit-hour-field:focus':
        fieldBaseTokens.contentBackground$selection,
      '::-webkit-datetime-edit-minute-field:focus':
        fieldBaseTokens.contentBackground$selection,
      '::-webkit-datetime-edit-second-field:focus':
        fieldBaseTokens.contentBackground$selection,
      '::-webkit-datetime-edit-millisecond-field:focus':
        fieldBaseTokens.contentBackground$selection,
      '::-webkit-datetime-edit-ampm-field:focus':
        fieldBaseTokens.contentBackground$selection,
    },
    display: {
      default: 'block',
      // Remove built-in search icons on Chrome when type='search'
      '::-webkit-search-decoration': 'none',
      '::-webkit-search-cancel-button': 'none',
    },
  },
  input$disabled: {
    '::placeholder': {
      WebkitTextFillColor: 'currentColor',
      color: 'currentColor',
    },
  },
  input$error: {
    caretColor: {
      ':is([data-focused])': vars.caretColor$error$focus,
    },
  },
  input$noSpinner: {
    // TODO: Remove built-in number spinner on Chrome when type='number'
    display: {
      default: 'block',
      '::-webkit-inner-spin-button': 'none',
      '::-webkit-outer-spin-button': 'none',
    },
  },
  input$number: {
    // eslint-disable-next-line @stylexjs/valid-styles
    '-moz-appearance': 'textfield',
  },
  inputWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    display: 'flex',
    height: '100%',
  },
  prefix: {
    color: fieldBaseTokens.contentPrefixColor,
    textWrap: 'nowrap',
    width: 'min-content',
    paddingInlineEnd: fieldBaseTokens.contentPrefixTrailingSpace,
  },
  prefix$disabled: {
    color: 'inherit',
  },
  suffix: {
    color: fieldBaseTokens.contentSuffixColor,
    textWrap: 'nowrap',
    width: 'min-content',
    paddingInlineStart: fieldBaseTokens.contentSuffixLeadingSpace,
  },
  suffix$disabled: {
    color: 'inherit',
  },
});

export const textFieldBaseFieldStyles = stylex.create({
  host: {
    cursor: 'text',
  },
  field: {
    width: '100%',
  },
  field$textArea: {
    resize: 'inherit',
  },
});
