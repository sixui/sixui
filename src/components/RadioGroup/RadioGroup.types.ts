import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IBoxProps } from '../Box';
import type { IRadioGroupContextValue } from './RadioGroup.context';
import { IOmit } from '~/helpers/types';

export interface IRadioGroupOwnProps
  extends IOmit<IRadioGroupContextValue, 'changingValue'> {
  children?: React.ReactNode;
  defaultValue?: string;
  disabled?: boolean;
}

export interface IRadioGroupProps extends IBoxProps, IRadioGroupOwnProps {}

export type IRadioGroupFactory = IPolymorphicComponentFactory<{
  props: IRadioGroupProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
}>;
