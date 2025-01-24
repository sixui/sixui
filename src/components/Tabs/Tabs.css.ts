import type { ITabVariant } from '~/components/Tab';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles();

export type ITabsThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  variant: ITabVariant;
}>;

export const basicTemplateTheme = componentThemeFactory<ITabsThemeFactory>({
  classNames,
  tokens: undefined,
});
