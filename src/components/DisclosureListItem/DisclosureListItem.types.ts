import type { IOmit } from '~/helpers/types';
import type { IUseCheckboxProps } from '~/hooks/useCheckbox';
import type { IUseSwitchProps } from '~/hooks/useSwitch';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IListItemOwnProps } from '../ListItem';
import type {
  disclosureListItemTheme,
  IDisclosureListItemThemeFactory,
} from './DisclosureListItem.css';

export interface IDisclosureListItemOwnProps
  extends IListItemOwnProps,
    IOmit<IUseCheckboxProps, 'indeterminate' | 'defaultIndeterminate'>,
    IUseSwitchProps {
  collapseIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  expanded?: boolean;
  checkable?: boolean;
  switchable?: boolean;
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface IDisclosureListItemProps
  extends IBoxProps,
    IComponentThemeProps<IDisclosureListItemThemeFactory>,
    IDisclosureListItemOwnProps {}

export type IDisclosureListItemFactory = IComponentFactory<{
  props: IDisclosureListItemProps;
  ref: HTMLDivElement;
  theme: typeof disclosureListItemTheme;
}>;
