import { createContext } from 'react';

export type IStepperContext = {
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'right' | 'bottom';
  completed?: boolean;
  activeStep?: number;
  connector?: React.ReactNode;
};

export const StepperContext = createContext<IStepperContext | undefined>(
  undefined,
);
