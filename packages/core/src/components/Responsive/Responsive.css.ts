import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { CSS_FALSE } from '~/utils/css/constants';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './Responsive.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
