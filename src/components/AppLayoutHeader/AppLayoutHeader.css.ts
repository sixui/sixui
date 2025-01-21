import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier = 'with-divider';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    height: fallbackVar(appLayoutTheme.tokens.header.height, px(64)),
    color: fallbackVar(
      appLayoutTheme.tokens.header.color,
      themeTokens.colorScheme.surface,
    ),
  },
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
    position: 'sticky',
    top: 0,
    insetInline: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: tokens.container.height,
    zIndex: themeTokens.zIndex.app,
    paddingLeft: px(space(3)),
    paddingRight: px(space(3)),
    gap: px(space(3)),

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('with-divider')]: {
        borderBottomWidth: tokens.divider.width,
        borderBottomColor: tokens.divider.color,
        borderBottomStyle: 'solid',
      },
    },
  },
});

export type IAppLayoutHeaderThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const appLayoutHeaderTheme =
  componentThemeFactory<IAppLayoutHeaderThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
