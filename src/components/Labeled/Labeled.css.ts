import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { ILabeledVariant } from './Labeled.types';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
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

export type ILabeledThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: ILabeledVariant;
}>;

export const labeledTheme = componentThemeFactory<ILabeledThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const labeledThemeVariants = {
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
