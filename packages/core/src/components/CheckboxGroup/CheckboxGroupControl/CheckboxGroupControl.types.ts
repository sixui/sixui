import type { IBoxProps } from '~/components/Box';
import type { Checkbox } from '~/components/Checkbox';
import type { CheckboxCard } from '~/components/CheckboxCard';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IOmit } from '~/utils/types';
import type { ICheckboxGroupControlContextValue } from './CheckboxGroupControl.context';

export interface ICheckboxGroupControlOwnProps
  extends IOmit<ICheckboxGroupControlContextValue, 'changingValues'> {
  children?: React.ReactNode;
}

export interface ICheckboxGroupControlProps
  extends IBoxProps,
    ICheckboxGroupControlOwnProps {}

export type ICheckboxGroupControlFactory = IPolymorphicComponentFactory<{
  props: ICheckboxGroupControlProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  staticComponents: {
    Item: typeof Checkbox;
    Card: typeof CheckboxCard;
  };
}>;
