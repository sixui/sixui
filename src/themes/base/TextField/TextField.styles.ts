import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ITextFieldStyleKey } from '@/components/atoms/TextField';
import type { IFieldStyleKey } from '@/components/atoms/Field';
import { componentVars as vars } from './TextField.stylex';

// https://github.com/material-components/material-web/blob/main/textfield/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/textfield/internal/_input.scss
// https://github.com/material-components/material-web/blob/main/textfield/internal/_icon.scss

type ITextFieldStyles = IStyles<ITextFieldStyleKey>;
export const styles: MapNamespaces<ITextFieldStyles> =
  stylex.create<ITextFieldStyles>({
    host: {
      display: 'inline-flex',
      outline: 'none',
      resize: 'vertical',
    },
    textField: {
      width: '100%',
      display: 'inline-flex',
      // Note: only inherit default `resize: both` to the field when textarea.
      resize: 'inherit',
    },
    inputWrapper: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      display: 'flex',
    },
    inputWrapped: {
      resize: 'none',
      margin: 0,
      padding: 0,
      borderWidth: 'inherit',
      borderStyle: 'inherit',
      borderColor: 'inherit',
      backgroundColor: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit',
      letterSpacing: 'inherit',
      outline: {
        ':is([data-focused])': '0',
      },
    },
    input: {
      width: '100%',
      caretColor: {
        default: vars.caretColor,
        ':is([data-focused])': vars.caretColor$focus,
      },
      // remove extra height added by horizontal scrollbars
      overflowX: 'hidden',
      textAlign: 'inherit',
      '::placeholder': {
        color: vars.contentPlaceholderColor,
        opacity: 1,
      },
      '::selection': {
        backgroundColor: vars.contentBackground$selection,
        color: vars.contentColor$selection,
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
  });

type IFieldStyles = IStyles<IFieldStyleKey>;
export const fieldStyles: MapNamespaces<IFieldStyles> =
  stylex.create<IFieldStyles>({
    field: {
      width: '100%',
      cursor: 'text',
    },
    field$disabled: {
      cursor: 'default',
    },
    field$textarea: {
      resize: 'inherit',
    },
  });
