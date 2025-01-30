import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { Divider } from '~/components/Divider';
import { List } from '~/components/List';
import { themeTokens } from '~/components/ThemeProvider';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
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
  },
  list: {
    marginLeft: calc.negate(px(space(4))),
    marginRight: calc.negate(px(space(4))),

    vars: createTokensVars(List.theme.tokens, {
      topSpace: px(0),
      bottomSpace: px(0),
    }),
  },
  headline: {
    color: tokens.headline.color,
    ...getTypographyStyles(tokens.headline.typography),
  },
  divider: {
    vars: createTokensVars(Divider.theme.tokens, {
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
