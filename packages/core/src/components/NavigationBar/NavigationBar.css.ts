import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { NavigationBarContent } from '~/components/NavigationBar/NavigationBarContent';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './NavigationBar.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
    vars: overrideTokens(NavigationBarContent.theme.tokens, {
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
