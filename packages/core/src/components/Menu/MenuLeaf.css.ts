import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

const [tokensClassName, tokens] = createTheme();

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
  tokensClassName,
  tokens,
});
