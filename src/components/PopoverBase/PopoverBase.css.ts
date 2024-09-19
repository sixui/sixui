import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

const classNames = createStyles({
  root: {},
  floating: {
    zIndex: themeTokens.zIndex.popover,
    width: 'inherit',
    height: 'inherit',
  },
  floating$absolute: {
    position: 'absolute',
  },
  floating$fixed: {
    position: 'fixed',
  },
});

export type IPopoverBaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const popoverBaseTheme = componentThemeFactory<IPopoverBaseThemeFactory>(
  {
    classNames,
    tokens: undefined,
  },
);
