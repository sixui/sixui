import { createContext } from 'react';

import { StepConnector } from '@/components/atoms/StepConnector';

type IStepConnectorRenderProps = {
  active: boolean;
};

export type IStepperContext = {
  activeStep: number;
  connector:
    | React.ReactNode
    | ((props: IStepConnectorRenderProps) => React.ReactNode);
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'right' | 'bottom';
};

export const initialStepperContext: IStepperContext = {
  activeStep: 0,
  connector: ({ active }) => <StepConnector active={active} />,
  orientation: 'horizontal',
  labelPosition: 'right',
};

export const StepperContext = createContext<IStepperContext>(
  initialStepperContext,
);
