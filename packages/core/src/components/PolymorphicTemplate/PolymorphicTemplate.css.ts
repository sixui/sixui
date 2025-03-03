import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IPolymorphicTemplateVariant } from './PolymorphicTemplate.types';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './PolymorphicTemplate.constants';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  label: {
    typography: themeTokens.typeScale.label.md,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    padding: px(space('$sm')),

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color.normal,
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('disabled')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.disabled,
            opacity: tokens.container.opacity.disabled,
          },
        }),
      },
    },
  },
  label: ({ root }) => ({
    color: tokens.label.color.normal,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
});

export type IPolymorphicTemplateThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IPolymorphicTemplateVariant;
}>;

export const polymorphicTemplateTheme =
  componentThemeFactory<IPolymorphicTemplateThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });

export const polymorphicTemplateThemeVariants = {
  primary: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          color: {
            normal: themeTokens.colorScheme.primary,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        label: {
          color: {
            normal: themeTokens.colorScheme.onPrimary,
          },
        },
      }),
    },
  }),
  secondary: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          color: {
            normal: themeTokens.colorScheme.secondary,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
        label: {
          color: {
            normal: themeTokens.colorScheme.onSecondary,
          },
        },
      }),
    },
  }),
};
