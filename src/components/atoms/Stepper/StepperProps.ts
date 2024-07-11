import type { IContainerProps, IOrientation } from '@/helpers/types';
import type { IStepperStyleKey } from './Stepper.styledefs';

export type IStepperProps = IContainerProps<IStepperStyleKey> & {
  children: React.ReactNode;
  activeStep?: number;
  loading?: boolean;
  connector?: React.ReactNode;
  orientation?: IOrientation;
  labelPosition?: 'right' | 'bottom';
  completed?: boolean;
};
