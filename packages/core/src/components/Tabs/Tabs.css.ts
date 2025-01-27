import type { ITabsTabVariant } from '~/components/Tabs/TabsTab';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

const [tokensClassName, tokens] = createTheme();

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
