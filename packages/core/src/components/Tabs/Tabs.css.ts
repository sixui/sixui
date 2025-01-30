import type { ITabsTabVariant } from '~/components/Tabs/TabsTab';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './Tabs.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles();

export type ITabsThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  variant: ITabsTabVariant;
}>;

export const basicTemplateTheme = componentThemeFactory<ITabsThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
