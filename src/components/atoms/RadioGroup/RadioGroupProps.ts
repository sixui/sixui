import type { IContainerProps, IOmit } from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { IRadioGroupContextValue } from './RadioGroupContext';

export const RADIO_GROUP_DEFAULT_TAG = 'div';

export type IRadioGroupOwnProps = IOmit<IContainerProps, 'styles'> &
  IRadioGroupContextValue & {
    actions?: React.RefObject<unknown>;
    children?: React.ReactNode;
    defaultValue?: string;
  };

export type IRadioGroupProps<
  TRoot extends React.ElementType = typeof RADIO_GROUP_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IRadioGroupOwnProps>;
