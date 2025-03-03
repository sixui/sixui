import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './Breadcrumbs.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  item: {
    color: themeTokens.colorScheme.onSurface,
  },
  separator: {
    color: themeTokens.colorScheme.onSurface,
    size: themeTokens.typeScale.body.md.size,
    space: px(space('$sm')),
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
    marginLeft: calc.negate(px(space('$sm'))),
    marginRight: calc.negate(px(space('$sm'))),
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
