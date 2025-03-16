import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide, IOmit } from '~/utils/types';
import type {
  CheckboxGroupControl,
  ICheckboxGroupControlOwnProps,
  ICheckboxGroupControlProps,
} from './CheckboxGroupControl';

export interface ICheckboxGroupOwnProps
  extends ICheckboxGroupControlOwnProps,
    IOmit<ILabeledOwnProps, 'children'> {
  labelPosition?: IHorizontalSide;
  labeledProps?: ILabeledProps;
  controlProps?: ICheckboxGroupControlProps;
}

export interface ICheckboxGroupProps
  extends IBoxProps,
    ICheckboxGroupOwnProps {}

export type ICheckboxGroupFactory = IComponentFactory<{
  props: ICheckboxGroupProps;
  ref: HTMLInputElement;
  staticComponents: {
    Item: typeof CheckboxGroupControl.Item;
    Card: typeof CheckboxGroupControl.Card;
  };
}>;
