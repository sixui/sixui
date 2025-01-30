import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './TabsPanel.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles();

export type ITabsPanelThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const tabsPanelTheme = componentThemeFactory<ITabsPanelThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
