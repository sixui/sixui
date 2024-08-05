import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { IRadioGroupContextValue } from './RadioGroup.context';
import { IBaseProps } from '../Base';

export const RADIO_GROUP_DEFAULT_TAG = 'div';

export type IRadioGroupOwnProps = IBaseProps &
  IRadioGroupContextValue & {
    children?: React.ReactNode;
    defaultValue?: string;
  };

export type IRadioGroupProps<
  TRoot extends React.ElementType = typeof RADIO_GROUP_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IRadioGroupOwnProps>;
