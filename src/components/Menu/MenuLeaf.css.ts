import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

const classNames = createStyles({
  root: {
    zIndex: themeTokens.zIndex.popover,
  },
});

export type IMenuLeafThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const menuLeafTheme = componentThemeFactory<IMenuLeafThemeFactory>({
  classNames,
  tokens: undefined,
});
