import type { IMaybeAsync, IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBadgeProps } from '../Badge';
import type { IBoxProps } from '../Box';
import type { IButtonOwnProps } from '../Button';
import type { ITabThemeFactory, tabTheme } from './Tab.css';

export type ITabVariant = 'primary' | 'secondary';

export interface ITabOwnProps
  extends IOmit<IButtonOwnProps, 'leadingIcon' | 'trailingIcon'> {
  label?: React.ReactNode;
  /**
   * Whether or not the tab is selected.
   **/
  active?: boolean;

  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  anchor?: string;
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
