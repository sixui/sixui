import type { IBaseProps } from '../Base';
import type { IRadioGroupContextValue } from './RadioGroup.context';

export type IRadioGroupProps = IBaseProps &
  IRadioGroupContextValue & {
    children?: React.ReactNode;
    defaultValue?: string;
  };
