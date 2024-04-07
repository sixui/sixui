import { createContext } from 'react';

import { StepConnector } from '@/components/atoms/StepConnector';

export type IStepperContext = {
  activeStep: number;
  connector: React.ReactNode;
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'right' | 'bottom';
};

const defaultConnector = <StepConnector />;

export const initialStepperContext: IStepperContext = {
  activeStep: 0,
  connector: defaultConnector,
  orientation: 'horizontal',
  labelPosition: 'right',
};

export const StepperContext = createContext<IStepperContext>(
  initialStepperContext,
);
