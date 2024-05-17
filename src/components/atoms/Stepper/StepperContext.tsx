import { createContext } from 'react';

export type IStepperContext = {
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'right' | 'bottom';
  activeStep?: number;
  loading?: boolean;
  completed?: boolean;
  connector?: React.ReactNode;
};

export const StepperContext = createContext<IStepperContext | undefined>(
  undefined,
);
