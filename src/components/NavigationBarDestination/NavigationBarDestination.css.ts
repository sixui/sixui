import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles();

export type INavigationBarDestinationThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const navigationBarDestinationTheme =
  componentThemeFactory<INavigationBarDestinationThemeFactory>({
    classNames,
    tokens: undefined,
  });
