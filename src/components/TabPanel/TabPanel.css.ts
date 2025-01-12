import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles();

export type ITabPanelThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const tabPanelTheme = componentThemeFactory<ITabPanelThemeFactory>({
  classNames,
  tokens: undefined,
});
