import { createTheme, createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { PaperBase } from '../PaperBase';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { FieldBase } from '../FieldBase';

type IModifier = IInteraction | 'disabled' | 'with-error' | 'no-spinner';

const [tokensClassName, tokens] = createTheme({
  caret: {
    color: {
      normal: themeTokens.colorScheme.primary,
      focused: themeTokens.colorScheme.primary,
      error: themeTokens.colorScheme.error,
    },
  },
});

const classNames = createStyles({
  root: {
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
  input: ({ root }) => ({
    overflowWrap: 'inherit',
    whiteSpace: 'inherit',
    resize: 'none',
    minWidth: px(30),
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    width: '100%',
    height: '100%',
    caretColor: tokens.caret.color.normal,
    // remove extra height added by horizontal scrollbars
    overflowX: 'hidden',
    textAlign: 'inherit',
    padding: 0,
    backgroundColor: 'inherit',
    borderStyle: 'unset',
    display: 'block',

    '::placeholder': {
      WebkitTextFillColor: FieldBase.theme.tokens.placeholder.color,
      color: FieldBase.theme.tokens.placeholder.color,
      opacity: 1,
    },
    '::selection': {
      backgroundColor: FieldBase.theme.tokens.selection.background,
    },
    '::-moz-color-swatch': {
      borderStyle: 'unset',
    },
    '::-webkit-color-swatch': {
      borderStyle: 'unset',
    },
    '::-webkit-color-swatch-wrapper': {
      borderStyle: 'unset',
      padding: 0,
    },
    '::-webkit-datetime-edit-day-field:focus': {
      backgroundColor: FieldBase.theme.tokens.selection.background,
    },
    '::-webkit-datetime-edit-month-field:focus': {
      backgroundColor: FieldBase.theme.tokens.selection.background,
    },
    '::-webkit-datetime-edit-year-field:focus': {
      backgroundColor: FieldBase.theme.tokens.selection.background,
    },
    '::-webkit-datetime-edit-week-field:focus': {
      backgroundColor: FieldBase.theme.tokens.selection.background,
    },
    '::-webkit-datetime-edit-hour-field:focus': {
      backgroundColor: FieldBase.theme.tokens.selection.background,
    },
    '::-webkit-datetime-edit-minute-field:focus': {
      backgroundColor: FieldBase.theme.tokens.selection.background,
    },
    '::-webkit-datetime-edit-second-field:focus': {
      backgroundColor: FieldBase.theme.tokens.selection.background,
    },
    '::-webkit-datetime-edit-millisecond-field:focus': {
      backgroundColor: FieldBase.theme.tokens.selection.background,
    },
    '::-webkit-datetime-edit-ampm-field:focus': {
      backgroundColor: FieldBase.theme.tokens.selection.background,
    },
    '::-webkit-search-decoration': {
      display: 'none',
    },
    '::-webkit-search-cancel-button': {
      display: 'none',
    },

    selectors: {
      [getModifierSelector<IModifier>('focused', root)]: {
        caretColor: tokens.caret.color.focused,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        '::placeholder': {
          WebkitTextFillColor: 'currentColor',
          color: 'currentColor',
        },
      },
      [getModifierSelector<IModifier>(['focused', 'with-error'], root)]: {
        caretColor: tokens.caret.color.error,
      },
      [getModifierSelector<IModifier>('no-spinner', root)]: {
        '::-webkit-inner-spin-button': {
          display: 'none',
        },
        '::-webkit-outer-spin-button': {
          display: 'none',
        },
      },
      [getModifierSelector<IModifier>('number', root)]: {
        '-moz-appearance': 'textfield',
      },
    },
    inputWrapper: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '0%',
      display: 'flex',
      height: '100%',
    },
    prefix: {
      color: FieldBase.theme.tokens.prefix.color,
      textWrap: 'nowrap',
      width: 'min-content',
      paddingInlineEnd: FieldBase.theme.tokens.prefix.trailingSpace,
    },
    prefix$disabled: {
      color: 'inherit',
    },
    suffix: {
      color: FieldBase.theme.tokens.suffix.color,
      textWrap: 'nowrap',
      width: 'min-content',
      paddingInlineStart: FieldBase.theme.tokens.suffix.leadingSpace,
    },
    suffix$disabled: {
      color: 'inherit',
    },
  }),
});

export type ITextFieldBaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const textFieldBaseTheme =
  componentThemeFactory<ITextFieldBaseThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
