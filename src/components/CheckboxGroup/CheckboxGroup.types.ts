import type { IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IBoxProps } from '../Box';
import type { ICheckboxGroupContextValue } from './CheckboxGroup.context';

export interface ICheckboxGroupOwnProps
  extends IOmit<ICheckboxGroupContextValue, 'changingValues'> {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface ICheckboxGroupProps
  extends IBoxProps,
    ICheckboxGroupOwnProps {}

export type ICheckboxGroupFactory = IPolymorphicComponentFactory<{
  props: ICheckboxGroupProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
}>;
