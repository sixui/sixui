import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { CSS_FALSE } from '~/helpers/styles/constants';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

const [tokensClassName, tokens] = createTheme({
  windowSizeClass: {
    compact: {
      on: CSS_FALSE,
      gte: CSS_FALSE,
    },
    medium: {
      on: CSS_FALSE,
      gte: CSS_FALSE,
    },
    expanded: {
      on: CSS_FALSE,
      gte: CSS_FALSE,
    },
    large: {
      on: CSS_FALSE,
      gte: CSS_FALSE,
    },
    extraLarge: {
      on: CSS_FALSE,
      gte: CSS_FALSE,
    },
  },
});

const classNames = createStyles();

export type IResponsiveThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const responsiveTheme = componentThemeFactory<IResponsiveThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
