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

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
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
