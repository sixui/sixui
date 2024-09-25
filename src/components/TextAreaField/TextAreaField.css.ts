import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IFieldBaseVariant } from '../FieldBase';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { FieldBase } from '../FieldBase';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'disabled' | 'with-error';

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
  textarea: ({ root }) => ({
    overflowWrap: 'inherit',
    whiteSpace: 'inherit',
    resize: 'none',
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
      [getModifierSelector<IModifier>('with-error', root)]: {
        caretColor: tokens.caret.color.error,
      },
      [`${getModifierSelector<IModifier>('disabled', root)}::placeholder`]: {
        WebkitTextFillColor: tokens.placeholder.color.disabled,
        color: tokens.placeholder.color.disabled,
        opacity: tokens.placeholder.opacity.disabled,
      },
    },
  }),
});

export type ITextAreaFieldThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  variant: IFieldBaseVariant;
  modifier: IModifier;
}>;

export const textAreaFieldTheme =
  componentThemeFactory<ITextAreaFieldThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });