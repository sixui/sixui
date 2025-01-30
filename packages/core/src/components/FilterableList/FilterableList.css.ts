import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './FilterableList.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles();

export type IFilterableListThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const filterableListTheme =
  componentThemeFactory<IFilterableListThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
