import type { IOrientation } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IStepperStylesKey } from './Stepper.styles';

export type IStepperProps = IBaseProps<IStepperStylesKey> & {
  children: React.ReactNode;
  activeStep?: number;
  loading?: boolean;
  connector?: React.ReactNode;
  orientation?: IOrientation;
  labelPosition?: 'right' | 'bottom';
  completed?: boolean;
};
