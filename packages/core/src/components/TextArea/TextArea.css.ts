import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { FieldBase } from '~/components/FieldBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './TextArea.constants';

type IModifier = 'disabled' | 'with-error';

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
    resize: 'vertical',
  },
  textarea: ({ root }) => ({
    overflowWrap: 'inherit',
    resize: 'none',
    width: '100%',
    height: '100%',
    // Remove extra height added by horizontal scrollbars.
    overflowX: 'hidden',
    textAlign: 'inherit',
    padding: 0,
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
      color: FieldBase.theme.tokens.selection.color,
    },

    selectors: {
      [modifierSelector<IModifier>('with-error', root)]: {
        caretColor: tokens.caret.color.error,
      },
      [`${modifierSelector<IModifier>('disabled', root)}::placeholder`]: {
        WebkitTextFillColor: tokens.placeholder.color.disabled,
        color: tokens.placeholder.color.disabled,
        opacity: tokens.placeholder.opacity.disabled,
      },
    },
  }),
});

export type ITextAreaThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  variant: IFieldBaseVariant;
  modifier: IModifier;
}>;

export const textAreaTheme = componentThemeFactory<ITextAreaThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
