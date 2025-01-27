import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { NavigationBarContent } from '~/components/NavigationBar/NavigationBarContent';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';
import { createTokensVars } from '~/utils/styles/createTokensVars';

const [tokensClassName, tokens] = createTheme({
  container: {
    height: px(80),
  },
});

const classNames = createStyles({
  root: {
    width: '100%',
    height: tokens.container.height,
  },
  navigationBarContent: {
    vars: createTokensVars(NavigationBarContent.theme.tokens, {
      container: {
        height: tokens.container.height,
      },
    }),
  },
});

export type INavigationBarThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const navigationBarTheme =
  componentThemeFactory<INavigationBarThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
