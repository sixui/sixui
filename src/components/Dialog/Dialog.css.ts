import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles();

export type IDialogThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const dialogTheme = componentThemeFactory<IDialogThemeFactory>({
  classNames,
  tokens: undefined,
});
