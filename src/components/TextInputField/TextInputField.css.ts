import { createTheme } from '@vanilla-extract/css';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { px } from '~/helpers/styles/px';
import { IInteraction } from '~/hooks/useInteractions';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { FieldBase, type IFieldBaseVariant } from '../FieldBase';
import { themeTokens } from '../ThemeProvider';

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
    cursor: 'text',
    resize: 'vertical',
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
  }),
});

export type ITextInputFieldThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  variant: IFieldBaseVariant;
}>;

export const textInputFieldTheme =
  componentThemeFactory<ITextInputFieldThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
