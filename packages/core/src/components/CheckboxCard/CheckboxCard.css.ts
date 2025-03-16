import type { ICardVariant } from '~/components/Card';
import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Card } from '~/components/Card';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { typography } from '~/utils/css/typography';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './CheckboxCard.constants';

type IModifier = IInteraction | 'disabled' | 'checked' | 'with-error';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: {
      normal: themeTokens.colorScheme.surfaceContainerHigh,
      error: themeTokens.colorScheme.surfaceContainerHigh,
      disabled: themeTokens.colorScheme.surfaceContainerHigh,
    },
  },
  outline: {
    color: {
      normal: themeTokens.colorScheme.outlineVariant,
      checked: themeTokens.colorScheme.primary,
      error: themeTokens.colorScheme.error,
      disabled: themeTokens.colorScheme.outline,
    },
    width: {
      normal: px(themeTokens.outline.width.sm),
      checked: px(themeTokens.outline.width.sm),
      error: px(themeTokens.outline.width.sm),
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  supportingText: {
    typography: themeTokens.typeScale.body.sm,
  },
});

const classNames = createStyles({
  root: {
    textAlign: 'left',

    vars: overrideTokens(Card.theme.tokens, {
      container: {
        color: {
          normal: tokens.container.color.normal,
          disabled: tokens.container.color.disabled,
        },
      },
      outline: {
        width: {
          normal: tokens.outline.width.normal,
        },
        color: {
          normal: tokens.outline.color.normal,
          disabled: tokens.outline.color.disabled,
        },
        opacity: {
          disabled: tokens.outline.opacity.disabled,
        },
      },
    }),
    selectors: {
      [modifierSelector<IModifier>('checked')]: {
        vars: overrideTokens(Card.theme.tokens, {
          outline: {
            color: {
              normal: tokens.outline.color.checked,
            },
            width: {
              normal: tokens.outline.width.checked,
            },
          },
        }),
      },
      [modifierSelector<IModifier>('with-error')]: {
        vars: overrideTokens(Card.theme.tokens, {
          container: {
            color: {
              normal: tokens.container.color.error,
            },
          },
          outline: {
            color: {
              normal: tokens.outline.color.error,
            },
            width: {
              normal: tokens.outline.width.error,
            },
          },
        }),
      },
    },
  },
  supportingText: ({ root }) => ({
    ...typography(tokens.supportingText.typography),

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  }),
});

export type ICheckboxCardThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
  tokens: typeof tokens;
  variant: ICardVariant;
}>;

export const checkboxCardTheme =
  componentThemeFactory<ICheckboxCardThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
