import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { themeTokens } from '~/components/Theme/theme.css';
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
    display: 'inline',
    listStyle: 'none',
  },
  item: {
    color: tokens.item.color,
    display: 'inline',
    verticalAlign: 'middle',
  },
  moreButton: {
    verticalAlign: 'middle',
  },
  separator: {
    color: tokens.separator.color,
    display: 'inline',
    userSelect: 'none',
    fontSize: tokens.separator.size,
    marginInline: tokens.separator.space,
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
