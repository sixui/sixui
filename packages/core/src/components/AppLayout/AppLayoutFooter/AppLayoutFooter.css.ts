import { fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { appLayoutTheme } from '~/components/AppLayout/AppLayout.css';
import { COMPONENT_NAME } from './AppLayoutFooter.constants';

type IModifier = 'with-divider';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('with-divider')]: {
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
