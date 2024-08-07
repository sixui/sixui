import stylex from '@stylexjs/stylex';

import { scaleTokens } from '~/themes/base/scale.stylex';
import { fieldBaseTokens } from '../FieldBase/FieldBase.stylex';
import { textFieldBaseTokens } from './TextFieldBase.stylex';

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
    minWidth: `calc(30px * ${scaleTokens.scale})`,
    fontFamily: fieldBaseTokens.contentFont,
    fontSize: fieldBaseTokens.contentSize,
    fontWeight: fieldBaseTokens.contentWeight,
    lineHeight: fieldBaseTokens.contentLineHeight,
    letterSpacing: fieldBaseTokens.contentLetterSpacing,

    width: '100%',
    height: '100%',
    caretColor: {
      default: textFieldBaseTokens.caretColor,
      ':is([data-focused])': textFieldBaseTokens.caretColor$focus,
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

      // color: fieldBaseTokens.contentColor$selection,
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
      ':is([data-focused])': textFieldBaseTokens.caretColor$error$focus,
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

export const textFieldBaseFieldBaseStyles = stylex.create({
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
