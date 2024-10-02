import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

const classNames = createStyles({
  root: {
    zIndex: themeTokens.zIndex.popover,
  },
  floating: {
    width: 'inherit',
    height: 'inherit',
    position: 'absolute',
    zIndex: themeTokens.zIndex.popover,
  },
});

export type IFloatingFilterableListBaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const floatingFilterableListBaseTheme =
  componentThemeFactory<IFloatingFilterableListBaseThemeFactory>({
    classNames,
    tokens: undefined,
  });
