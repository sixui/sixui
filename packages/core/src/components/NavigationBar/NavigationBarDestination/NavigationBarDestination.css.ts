import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
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
