import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide, IOmit } from '~/utils/types';
import type {
  IRadioGroupControlOwnProps,
  IRadioGroupControlProps,
  RadioGroupControl,
} from './RadioGroupControl';

export interface IRadioGroupOwnProps
  extends IRadioGroupControlOwnProps,
    IOmit<ILabeledOwnProps, 'children'> {
  labelPosition?: IHorizontalSide;
  labeledProps?: Partial<ILabeledProps>;
  controlProps?: Partial<IRadioGroupControlProps>;
}

export interface IRadioGroupProps extends IBoxProps, IRadioGroupOwnProps {}

export type IRadioGroupFactory = IComponentFactory<{
  props: IRadioGroupProps;
  ref: HTMLInputElement;
  staticComponents: {
    Item: typeof RadioGroupControl.Item;
    Card: typeof RadioGroupControl.Card;
  };
}>;
