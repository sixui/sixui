import type { IMaybeAsync } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBadgeProps } from '../Badge';
import type { IBoxProps } from '../Box';
import type { ITabThemeFactory, tabTheme } from './Tab.css';

export type ITabVariant = 'primary' | 'secondary';

export interface ITabOwnProps {
  /**
   * Whether or not the tab is selected.
   **/
  active?: boolean;

  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<unknown>;
  label?: string;
  href?: string;
  anchor?: string;
  disabled?: boolean;
  badgeProps?: IBadgeProps;
}

export interface ITabProps
  extends IBoxProps,
    IComponentThemeProps<ITabThemeFactory>,
    ITabOwnProps {}

export type ITabFactory = IPolymorphicComponentFactory<{
  props: ITabProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof tabTheme;
  variant: ITabVariant | false;
}>;
