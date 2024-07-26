import type { IContainerProps, IOrientation } from '~/helpers/types';
import type { IStepperStylesKey } from './Stepper.styles';

export type IStepperProps = IContainerProps<IStepperStylesKey> & {
  children: React.ReactNode;
  activeStep?: number;
  loading?: boolean;
  connector?: React.ReactNode;
  orientation?: IOrientation;
  labelPosition?: 'right' | 'bottom';
  completed?: boolean;
};
