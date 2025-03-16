import type { IBoxProps } from '~/components/Box';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IRadioGroupControlContextValue } from './RadioGroupControl.context';
import { Radio } from '~/components/Radio';
import { RadioCard } from '~/components/RadioCard';
import { IOmit } from '~/utils/types';

export interface IRadioGroupControlOwnProps
  extends IOmit<IRadioGroupControlContextValue, 'changingValue'> {
  children?: React.ReactNode;
  defaultValue?: string;
}

export interface IRadioGroupControlProps
  extends IBoxProps,
    IRadioGroupControlOwnProps {}

export type IRadioGroupControlFactory = IPolymorphicComponentFactory<{
  props: IRadioGroupControlProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  staticComponents: {
    Item: typeof Radio;
    Card: typeof RadioCard;
  };
}>;
