import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles();

export type IFilterableListThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const filterableListTheme =
  componentThemeFactory<IFilterableListThemeFactory>({
    classNames,
    tokens: undefined,
  });
