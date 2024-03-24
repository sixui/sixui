import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ITextFieldStyleKey } from '@/components/atoms/TextField';
import type { IFieldBaseStyleKey } from '@/components/atoms/FieldBase';
import { componentVars as fieldBaseVars } from '../FieldBase/FieldBase.stylex';
import { componentVars as vars } from './TextField.stylex';

// https://github.com/material-components/material-web/blob/main/textfield/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/textfield/internal/_input.scss
// https://github.com/material-components/material-web/blob/main/textfield/internal/_icon.scss

type ITextFieldStyles = IStyles<ITextFieldStyleKey>;
export const styles: MapNamespaces<ITextFieldStyles> =
  stylex.create<ITextFieldStyles>({
    host: {
      display: 'flex',
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

      width: '100%',
      caretColor: {
        default: vars.caretColor,
        ':is([data-focused])': vars.caretColor$focus,
      },
      // remove extra height added by horizontal scrollbars
      overflowX: 'hidden',
      textAlign: 'inherit',
      '::placeholder': {
        WebkitTextFillColor: fieldBaseVars.contentPlaceholderColor,
        color: fieldBaseVars.contentPlaceholderColor,
        opacity: 1,
      },
      '::selection': {
        backgroundColor: fieldBaseVars.contentBackground$selection,
        color: fieldBaseVars.contentColor$selection,
      },
      color: 'inherit',

      display: {
        default: 'block',
        // Remove built-in datepicker icon on Chrome
        '::-webkit-calendar-picker-indicator': 'none',
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
    },
    prefix: {
      color: fieldBaseVars.contentPrefixColor,
      textWrap: 'nowrap',
      width: 'min-content',
      paddingInlineEnd: fieldBaseVars.contentPrefixTrailingSpace,
    },
    prefix$disabled: {
      color: 'inherit',
    },
    suffix: {
      color: fieldBaseVars.contentSuffixColor,
      textWrap: 'nowrap',
      width: 'min-content',
      paddingInlineStart: fieldBaseVars.contentSuffixLeadingSpace,
    },
    suffix$disabled: {
      color: 'inherit',
    },
  });

type IFieldBaseStyles = IStyles<IFieldBaseStyleKey>;
export const fieldStyles: MapNamespaces<IFieldBaseStyles> =
  stylex.create<IFieldBaseStyles>({
    host: {
      cursor: 'text',
    },
    field: {
      width: '100%',
    },
    field$textarea: {
      resize: 'inherit',
    },
  });
