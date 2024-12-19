import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IRadioVariant } from './Radio.types';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  //
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        shape: px(themeTokens.shape.corner.full),
      },
    }),
    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        //
      },
    },
  },
});

export type IRadioThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IRadioVariant;
}>;

export const RadioTheme = componentThemeFactory<IRadioThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const RadioThemeVariants = {
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
