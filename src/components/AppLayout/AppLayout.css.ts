import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'navigation-mode';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  header: {
    height: px(64),
    color: 'initial',
  },
  navigationBar: {
    height: px(40),
    color: 'initial',
  },
  navigationDrawer: {
    width: px(360), // FIXME: not work
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
