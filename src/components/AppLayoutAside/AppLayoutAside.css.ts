import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles();

export type IAppLayoutAsideThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const appLayoutAsideTheme =
  componentThemeFactory<IAppLayoutAsideThemeFactory>({
    classNames,
    tokens: undefined,
  });
