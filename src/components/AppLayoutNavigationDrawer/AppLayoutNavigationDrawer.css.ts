import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier = 'modal';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    width: fallbackVar(appLayoutTheme.tokens.navigationDrawer.width, px(360)),
    color: fallbackVar(
      appLayoutTheme.tokens.navigationDrawer.color,
      themeTokens.colorScheme.surface,
    ),
  },
});

const classNames = createStyles({
  root: {
    height: '100%',
    width: tokens.container.width,

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('modal')]: {
        width: `min(${tokens.container.width}, 100vw - ${px(48)})`,
      },
    },
  },
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
  },
  transitionContainer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: tokens.container.width,
  },
});

export type IAppLayoutNavigationDrawerThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const appLayoutNavigationDrawerTheme =
  componentThemeFactory<IAppLayoutNavigationDrawerThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
