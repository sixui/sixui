import { fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { appLayoutTheme } from '~/components/AppLayout/AppLayout.css';

type IModifier = 'with-divider';

const [tokensClassName, tokens] = createTheme({
  container: {
    color: fallbackVar(
      appLayoutTheme.tokens.footer.color,
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
    zIndex: themeTokens.zIndex.app,
    padding: px(space(6)),

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('with-divider')]: {
        borderTopWidth: tokens.divider.width,
        borderTopColor: tokens.divider.color,
        borderTopStyle: 'solid',
      },
    },
  },
  inner: {
    maxWidth: 1248,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: px(space(4)),

    paddingTop: px(space(4)),
    paddingBottom: px(space(4)),
    paddingLeft: px(space(2)),
    paddingRight: px(space(2)),
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
