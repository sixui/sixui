import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier = 'with-divider';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  divider: {
    width: fallbackVar(
      appLayoutTheme.tokens.divider.width,
      themeTokens.outline.width.xs,
    ),
    color: fallbackVar(
      appLayoutTheme.tokens.divider.color,
      themeTokens.colorScheme.outline,
    ),
  },
});

const classNames = createStyles({
  root: {
    zIndex: themeTokens.zIndex.app,
    padding: px(space(6)),

    selectors: {
      [getModifierSelector<IModifier>('with-divider')]: {
        borderTopWidth: tokens.divider.width,
        borderTopColor: tokens.divider.color,
        borderTopStyle: 'solid',
      },
    },
  },
});

export type IAppLayoutFooterThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const appLayoutFooterTheme =
  componentThemeFactory<IAppLayoutFooterThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
