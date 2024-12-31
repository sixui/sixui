import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { cardTheme } from '../Card/Card.css';

type IModifier = 'disabled';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  headline: {
    typography: themeTokens.typeScale.title.lg,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  subhead: {
    typography: themeTokens.typeScale.title.md,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  supportingText: {
    typography: themeTokens.typeScale.body.md,
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: calc.add(px(space(2)), DENSITY),
  },
  headline: {
    color: tokens.headline.color.normal,
    ...getTypographyStyles(tokens.headline.typography),

    selectors: {
      [getModifierSelector({ disabled: true }, cardTheme.classNames.root)]: {
        color: tokens.headline.color.disabled,
        opacity: tokens.headline.opacity.disabled,
      },
    },
  },
  subhead: {
    color: tokens.subhead.color.normal,
    ...getTypographyStyles(tokens.subhead.typography),

    selectors: {
      [getModifierSelector({ disabled: true }, cardTheme.classNames.root)]: {
        color: tokens.subhead.color.disabled,
        opacity: tokens.subhead.opacity.disabled,
      },
    },
  },
  supportingText: {
    color: tokens.supportingText.color.normal,
    ...getTypographyStyles(tokens.supportingText.typography),

    selectors: {
      [getModifierSelector({ disabled: true }, cardTheme.classNames.root)]: {
        color: tokens.supportingText.color.disabled,
        opacity: tokens.supportingText.opacity.disabled,
      },
    },
  },
});

export type ICardTitleThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const cardTitleTheme = componentThemeFactory<ICardTitleThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
