import type { IMaybeAsync } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
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

export type ITabFactory = IComponentFactory<{
  props: ITabProps;
  ref: HTMLDivElement;
  theme: typeof tabTheme;
  variant: ITabVariant | false;
}>;
