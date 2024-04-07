import { createContext } from 'react';

export type IStepperContext = {
  activeStep: number;
  connector: React.ReactNode;
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'right' | 'bottom';
};

export const StepperContext = createContext<IStepperContext | undefined>(
  undefined,
);
