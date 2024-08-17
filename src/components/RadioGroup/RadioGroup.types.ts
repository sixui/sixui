import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { IBaseProps } from '../Base';
import type { IRadioGroupContextValue } from './RadioGroup.context';

export const RADIO_GROUP_DEFAULT_TAG = 'div';

export type IRadioGroupOwnProps = IBaseProps &
  IRadioGroupContextValue & {
    children?: React.ReactNode;
    defaultValue?: string;
  };

export type IRadioGroupProps<
  TRoot extends React.ElementType = typeof RADIO_GROUP_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IRadioGroupOwnProps>;
