import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { FieldBase } from '~/components/FieldBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { COMPONENT_NAME } from './TextInputField.constants';

type IModifier = 'disabled' | 'with-error' | 'no-spinner';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
  },
  input: ({ root }) => ({
    overflowWrap: 'inherit',
    whiteSpace: 'inherit',
    resize: 'none',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    // Remove extra height added by horizontal scrollbars.
    overflowX: 'hidden',
    textAlign: 'inherit',
    padding: 0,
    backgroundColor: 'inherit',
    borderStyle: 'unset',
    display: 'block',
    caretColor: tokens.caret.color.normal,
    cursor: 'text',
    position: 'absolute',
    inset: 0,

    height: '100%',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,

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
      [modifierSelector<IModifier>('with-error', root)]: {
        caretColor: tokens.caret.color.error,
      },
      [`${modifierSelector<IModifier>('disabled', root)}::placeholder`]: {
        WebkitTextFillColor: tokens.placeholder.color.disabled,
        color: tokens.placeholder.color.disabled,
        opacity: tokens.placeholder.opacity.disabled,
      },
      [`${modifierSelector<IModifier>('no-spinner', root)}::-webkit-inner-spin-button`]:
        {
          display: 'none',
        },
      [`${modifierSelector<IModifier>('no-spinner', root)}::-webkit-outer-spin-button`]:
        {
          display: 'none',
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
