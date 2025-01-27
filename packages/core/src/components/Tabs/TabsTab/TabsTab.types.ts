import type { IBoxProps } from '~/components/Box';
import type { IButtonOwnProps } from '~/components/Button';
import type { IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { ITabsTabThemeFactory, tabsTabTheme } from './TabsTab.css';

export type ITabsTabVariant = 'primary' | 'secondary';

export interface ITabsTabOwnProps
  extends IOmit<IButtonOwnProps, 'leadingIcon' | 'trailingIcon' | 'children'> {
  label?: React.ReactNode;

  /** Whether or not the tab is selected. **/
  active?: boolean;

  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  anchor?: string;
  badge?: React.ReactNode;
}

export interface ITabsTabProps
  extends IBoxProps,
    IComponentThemeProps<ITabsTabThemeFactory>,
    ITabsTabOwnProps {}

export type ITabsTabFactory = IPolymorphicComponentFactory<{
  props: ITabsTabProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof tabsTabTheme;
  variant: ITabsTabVariant | false;
}>;
