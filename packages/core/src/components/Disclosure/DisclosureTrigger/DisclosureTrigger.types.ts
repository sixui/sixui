import type { IBoxProps } from '~/components/Box';
import type { IListItemOwnProps } from '~/components/List/ListItem';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IUseCheckboxProps } from '~/hooks/useCheckbox';
import type { IUseSwitchProps } from '~/hooks/useSwitch';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  disclosureTriggerTheme,
  IDisclosureTriggerThemeFactory,
} from './DisclosureTrigger.css';

export interface IDisclosureTriggerOwnProps
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

export interface IDisclosureTriggerProps
  extends IBoxProps,
    IComponentThemeProps<IDisclosureTriggerThemeFactory>,
    IDisclosureTriggerOwnProps {}

export type IDisclosureTriggerFactory = IComponentFactory<{
  props: IDisclosureTriggerProps;
  ref: HTMLDivElement;
  theme: typeof disclosureTriggerTheme;
}>;
