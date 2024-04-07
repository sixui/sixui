import { createContext } from 'react';

export type IStepConnectorRenderProps = {
  completed?: boolean;
};

export type IStepperContext = {
  activeStep: number;
  connector:
    | React.ReactNode
    | ((props: IStepConnectorRenderProps) => React.ReactNode);
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'right' | 'bottom';
};

export const StepperContext = createContext<IStepperContext | undefined>(
  undefined,
);
