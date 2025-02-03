import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { COMPONENT_NAME } from './CardTitle.constants';

const DENSITY = px(density({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  headline: {
    color: themeTokens.colorScheme.onSurface,
    typography: themeTokens.typeScale.title.lg,
  },
  subhead: {
    color: themeTokens.colorScheme.onSurface,
    typography: themeTokens.typeScale.title.md,
  },
  supportingText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.body.md,
  },
});

const classNames = createStyles({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: calc.add(px(space(2)), DENSITY),
  },
  headline: {
    color: tokens.headline.color,
    ...typography(tokens.headline.typography),
  },
  subhead: {
    color: tokens.subhead.color,
    ...typography(tokens.subhead.typography),
  },
  supportingText: {
    color: tokens.supportingText.color,
    ...typography(tokens.supportingText.typography),
  },
});

export type ICardTitleThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const cardTitleTheme = componentThemeFactory<ICardTitleThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
