import type { ITabsTabVariant } from '~/components/Tabs/TabsTab';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
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
