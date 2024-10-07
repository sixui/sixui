import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

const classNames = createStyles({
  floating: {
    position: 'absolute',
    zIndex: themeTokens.zIndex.popover,
    display: 'flex',
    flexGrow: 1,
  },
});

export type IMenuLeafThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const menuLeafTheme = componentThemeFactory<IMenuLeafThemeFactory>({
  classNames,
  tokens: undefined,
});
