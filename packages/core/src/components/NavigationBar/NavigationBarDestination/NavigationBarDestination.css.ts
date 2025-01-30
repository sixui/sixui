import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './NavigationBarDestination.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles();

export type INavigationBarDestinationThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const navigationBarDestinationTheme =
  componentThemeFactory<INavigationBarDestinationThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
