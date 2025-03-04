import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { themeTokens } from '~/components/Theme/theme.css';
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
