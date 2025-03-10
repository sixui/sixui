import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide } from '~/utils/types';
import type { checkboxTheme, ICheckboxThemeFactory } from './Checkbox.css';
import type { CheckboxCard } from './CheckboxCard';
import type {
  CheckboxControl,
  ICheckboxControlOwnProps,
  ICheckboxControlProps,
} from './CheckboxControl';
import type { CheckboxGroup } from './CheckboxGroup';
import type { CheckboxIndicator } from './CheckboxIndicator';

export interface ICheckboxOwnProps
  extends ICheckboxControlOwnProps,
    Pick<
      ILabeledOwnProps,
      | 'label'
      | 'supportingText'
      | 'requiredSign'
      | 'id'
      | 'required'
      | 'disabled'
      | 'readOnly'
      | 'hasError'
      | 'errorText'
    > {
  labelPosition?: IHorizontalSide;
  labeledProps?: ILabeledProps;
  controlProps?: ICheckboxControlProps;
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
