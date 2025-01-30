import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getDensity } from '~/helpers/styles/getDensity';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './CardTitle.constants';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

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
    ...getTypographyStyles(tokens.headline.typography),
  },
  subhead: {
    color: tokens.subhead.color,
    ...getTypographyStyles(tokens.subhead.typography),
  },
  supportingText: {
    color: tokens.supportingText.color,
    ...getTypographyStyles(tokens.supportingText.typography),
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
