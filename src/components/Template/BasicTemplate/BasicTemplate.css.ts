import { createTheme } from '@vanilla-extract/css';

import type { IBasicTemplateVariant } from './BasicTemplate.types';
import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { space } from '~/helpers/styles/space';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../../ThemeProvider';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  container: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
  },
  label: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
  },
});

const classNames = createStyles({
  root: {
    backgroundColor: tokens.container.color.normal,
    color: tokens.label.color.normal,
    padding: px(space(2)),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        backgroundColor: tokens.container.color.disabled,
        color: tokens.label.color.disabled,
      },
    },
  },
});

export type IBasicTemplateThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IBasicTemplateVariant;
}>;

export const basicTemplateTheme =
  componentThemeFactory<IBasicTemplateThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });

export const basicTemplateThemeVariants = {
  primary: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: themeTokens.colorScheme.primary,
            disabled: themeTokens.colorScheme.surfaceContainerHighest,
          },
        },
        label: {
          color: {
            normal: themeTokens.colorScheme.onPrimary,
            disabled: themeTokens.colorScheme.onSurface,
          },
        },
      }),
    },
  }),
};
