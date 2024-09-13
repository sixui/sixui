import { createTheme } from '@vanilla-extract/css';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { px } from '~/helpers/styles/px';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { FieldBase, type IFieldBaseVariant } from '../FieldBase';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'disabled' | 'with-error' | 'no-spinner';

const [tokensClassName, tokens] = createTheme({
  caret: {
    color: {
      normal: themeTokens.colorScheme.primary,
      error: themeTokens.colorScheme.error,
    },
  },
  placeholder: {
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
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
    // remove extra height added by horizontal scrollbars
    overflowX: 'hidden',
    textAlign: 'inherit',
    padding: 0,
    backgroundColor: 'inherit',
    borderStyle: 'unset',
    display: 'block',
    caretColor: tokens.caret.color.normal,
    cursor: 'text',

    '::placeholder': {
      WebkitTextFillColor: tokens.placeholder.color.normal,
      color: tokens.placeholder.color.normal,
    },
    '::selection': {
      backgroundColor: FieldBase.theme.tokens.selection.background,
    },

    selectors: {
      '&::-moz-color-swatch': {
        borderStyle: 'unset',
      },
      '&::-webkit-color-swatch': {
        borderStyle: 'unset',
      },
      '&::-webkit-color-swatch-wrapper': {
        borderStyle: 'unset',
        padding: 0,
      },
      '&::-webkit-datetime-edit-day-field:focus': {
        backgroundColor: FieldBase.theme.tokens.selection.background,
      },
      '&::-webkit-datetime-edit-month-field:focus': {
        backgroundColor: FieldBase.theme.tokens.selection.background,
      },
      '&::-webkit-datetime-edit-year-field:focus': {
        backgroundColor: FieldBase.theme.tokens.selection.background,
      },
      '&::-webkit-datetime-edit-week-field:focus': {
        backgroundColor: FieldBase.theme.tokens.selection.background,
      },
      '&::-webkit-datetime-edit-hour-field:focus': {
        backgroundColor: FieldBase.theme.tokens.selection.background,
      },
      '&::-webkit-datetime-edit-minute-field:focus': {
        backgroundColor: FieldBase.theme.tokens.selection.background,
      },
      '&::-webkit-datetime-edit-second-field:focus': {
        backgroundColor: FieldBase.theme.tokens.selection.background,
      },
      '&::-webkit-datetime-edit-millisecond-field:focus': {
        backgroundColor: FieldBase.theme.tokens.selection.background,
      },
      '&::-webkit-datetime-edit-ampm-field:focus': {
        backgroundColor: FieldBase.theme.tokens.selection.background,
      },
      '&::-webkit-search-decoration': {
        display: 'none',
      },
      '&::-webkit-search-cancel-button': {
        display: 'none',
      },
      [getModifierSelector<IModifier>('with-error', root)]: {
        caretColor: tokens.caret.color.error,
      },
      [`${getModifierSelector<IModifier>('disabled', root)}::placeholder`]: {
        WebkitTextFillColor: tokens.placeholder.color.disabled,
        color: tokens.placeholder.color.disabled,
        opacity: tokens.placeholder.opacity.disabled,
      },
      [`${getModifierSelector<IModifier>('no-spinner', root)}::-webkit-inner-spin-button`]:
        {
          display: 'none',
        },
      [`${getModifierSelector<IModifier>('no-spinner', root)}::-webkit-outer-spin-button`]:
        {
          display: 'none',
        },
      [getModifierSelector({ type: 'number' }, root)]: {
        '-moz-appearance': 'textfield',
      },
    },
  }),
});

export type ITextInputFieldThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  variant: IFieldBaseVariant;
  modifier: IModifier;
}>;

export const textInputFieldTheme =
  componentThemeFactory<ITextInputFieldThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
