import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './MenuLeaf.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

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
