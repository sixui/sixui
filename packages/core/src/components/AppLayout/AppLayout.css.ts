import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './AppLayout.constants';

type IModifier = 'navigation-mode';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  header: {
    height: px(64),
    color: 'initial',
  },
  navigationBar: {
    height: px(80),
    color: 'initial',
  },
  navigationDrawer: {
    width: px(360),
    color: 'initial',
  },
  navigationRail: {
    width: px(80),
    color: 'initial',
  },
  sideSheet: {
    width: px(400),
    color: 'initial',
  },
  body: {
    color: 'initial',
  },
  footer: {
    height: px(64),
    color: 'initial',
  },
  divider: {
    width: px(themeTokens.outline.width.xs),
    color: themeTokens.colorScheme.outline,
  },
});

const classNames = createStyles({
  root: {
    selectors: {
      [getModifierSelector<IModifier>({ 'navigation-mode': 'bar' })]: {
        marginBottom: tokens.navigationBar.height,
      },
    },
  },
});

export type IAppLayoutThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const appLayoutTheme = componentThemeFactory<IAppLayoutThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
