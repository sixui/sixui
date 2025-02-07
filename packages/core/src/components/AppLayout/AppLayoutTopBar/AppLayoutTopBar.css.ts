import { fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { TopAppBar } from '~/components/TopAppBar';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { appLayoutTheme } from '~/components/AppLayout/AppLayout.css';
import { COMPONENT_NAME } from './AppLayoutTopBar.constants';

type IModifier = 'with-divider';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    height: fallbackVar(appLayoutTheme.tokens.topBar.height, px(64)),
    color: fallbackVar(
      appLayoutTheme.tokens.topBar.color,
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
    height: tokens.container.height,
    zIndex: themeTokens.zIndex.app,

    vars: overrideTokens(TopAppBar.theme.tokens, {
      container: {
        color: {
          normal: tokens.container.color,
        },
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('with-divider')]: {
        borderBottomWidth: tokens.divider.width,
        borderBottomColor: tokens.divider.color,
        borderBottomStyle: 'solid',
      },
    },
  },
});

export type IAppLayoutTopBarThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const appLayoutTopBarTheme =
  componentThemeFactory<IAppLayoutTopBarThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
