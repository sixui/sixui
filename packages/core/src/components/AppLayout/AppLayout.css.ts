import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './AppLayout.constants';

type IModifier = 'navigation-mode' | 'with-top-bar';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  topBar: {
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
      [modifierSelector<IModifier>({ 'navigation-mode': 'bar' })]: {
        marginBottom: tokens.navigationBar.height,
      },
      [modifierSelector<IModifier>({ 'with-top-bar': false })]: {
        vars: {
          [tokens.topBar.height]: px(0),
        },
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
