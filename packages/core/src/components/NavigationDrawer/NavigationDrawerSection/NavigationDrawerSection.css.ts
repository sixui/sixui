import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Divider } from '~/components/Divider';
import { List } from '~/components/List';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { COMPONENT_NAME } from './NavigationDrawerSection.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  headline: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.title.sm,
  },
  divider: {
    color: themeTokens.colorScheme.outline,
  },
});

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: px(space(4)),
    paddingLeft: px(space(7)),
    paddingRight: px(space(7)),
    paddingTop: px(space(4)),
  },
  list: {
    marginLeft: calc.negate(px(space(4))),
    marginRight: calc.negate(px(space(4))),

    vars: overrideTokens(List.theme.tokens, {
      topSpace: px(0),
      bottomSpace: px(0),
    }),
  },
  headline: {
    color: tokens.headline.color,
    ...typography(tokens.headline.typography),
  },
  divider: {
    vars: overrideTokens(Divider.theme.tokens, {
      color: tokens.divider.color,
    }),
    marginTop: px(space(1)),
  },
});

export type INavigationDrawerSectionThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const navigationDrawerSectionTheme =
  componentThemeFactory<INavigationDrawerSectionThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
