import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { FocusRing } from '../FocusRing';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'disabled' | 'non-interactive';

const [tokensClassName, tokens] = createTheme({
  container: {
    shape: themeTokens.shape.corner.none,
  },
});

export const classNames = createStyles({
  root: {
    position: 'relative',
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        shape: tokens.container.shape,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        cursor: 'default',
        pointerEvents: 'none',
      },
      [getModifierSelector<IModifier>('non-interactive')]: {
        cursor: 'default',
        pointerEvents: 'none',
        userSelect: 'auto',
      },
    },
  },
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
  touchTarget: {},
  stateLayer: {},
  focusRing: {
    vars: createTokensVars(FocusRing.theme.tokens, {
      shape: tokens.container.shape,
    }),
  },
});

export type IButtonBaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
  tokens: typeof tokens;
}>;

export const buttonBaseTheme = componentThemeFactory<IButtonBaseThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
