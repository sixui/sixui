import type { IOmit } from '~/helpers/types';
import type { IUseCheckboxProps } from '~/hooks/useCheckbox';
import type { IUseSwitchProps } from '~/hooks/useSwitch';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IListItemOwnProps } from '../ListItem';
import type {
  disclosureButtonTheme,
  IDisclosureButtonThemeFactory,
} from './DisclosureButton.css';

export interface IDisclosureButtonOwnProps
  extends IListItemOwnProps,
    IOmit<IUseCheckboxProps | IUseSwitchProps, 'componentName'> {
  collapseIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  expanded?: boolean;
  checkable?: boolean;
  switchable?: boolean;
}

export interface IDisclosureButtonProps
  extends IBoxProps,
    IComponentThemeProps<IDisclosureButtonThemeFactory>,
    IDisclosureButtonOwnProps {}

export type IDisclosureButtonFactory = IComponentFactory<{
  props: IDisclosureButtonProps;
  ref: HTMLDivElement;
  theme: typeof disclosureButtonTheme;
}>;
