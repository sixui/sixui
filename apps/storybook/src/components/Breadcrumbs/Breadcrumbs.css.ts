import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { cssLayers, themeTokens } from '~/components/ThemeProvider';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  item: {
    color: themeTokens.colorScheme.onSurface,
  },
  separator: {
    color: themeTokens.colorScheme.onSurface,
    size: themeTokens.typeScale.body.md.size,
    space: px(space(2)),
  },
});

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.separator.space,
    listStyle: 'none',
  },
  item: {
    color: tokens.item.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  more: {
    height: '0',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: calc.negate(px(space(2))),
    marginRight: calc.negate(px(space(2))),
  },
  separator: {
    color: tokens.separator.color,
    display: 'flex',
    userSelect: 'none',
    fontSize: tokens.separator.size,
  },
});

export type IBreadcrumbsThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const breadcrumbsTheme = componentThemeFactory<IBreadcrumbsThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
