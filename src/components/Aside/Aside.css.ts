import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles();

export type IAsideThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const asideTheme = componentThemeFactory<IAsideThemeFactory>({
  classNames,
  tokens: undefined,
});
