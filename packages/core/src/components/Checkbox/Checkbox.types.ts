import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide } from '~/utils/types';
import type { ILabeledOwnProps } from '../Labeled';
import type { checkboxTheme, ICheckboxThemeFactory } from './Checkbox.css';
import type { CheckboxCard } from './CheckboxCard';
import type {
  CheckboxControl,
  ICheckboxControlOwnProps,
} from './CheckboxControl';
import type { CheckboxGroup } from './CheckboxGroup';
import type { CheckboxIndicator } from './CheckboxIndicator';

export interface ICheckboxOwnProps
  extends ICheckboxControlOwnProps,
    Pick<
      ILabeledOwnProps,
      'label' | 'supportingText' | 'hasError' | 'errorText' | 'requiredSign'
    > {
  labelPosition?: IHorizontalSide;
  labeledProps?: ILabeledOwnProps;
}

export interface ICheckboxProps
  extends IBoxProps,
    IComponentThemeProps<ICheckboxThemeFactory>,
    ICheckboxOwnProps {}

export type ICheckboxFactory = IComponentFactory<{
  props: ICheckboxProps;
  ref: HTMLInputElement;
  theme: typeof checkboxTheme;
  staticComponents: {
    Control: typeof CheckboxControl;
    Indicator: typeof CheckboxIndicator;
    Group: typeof CheckboxGroup;
    Card: typeof CheckboxCard;
  };
}>;
