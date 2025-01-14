import { createOptionalContext } from '~/helpers/createOptionalContext';

export type IStepperContextValue = {
  orientation?: 'horizontal' | 'vertical';
  labelPosition?: 'right' | 'bottom';
  activeStep?: number;
  loading?: boolean;
  completed?: boolean;
  connectorRenderer?: (props?: {
    extension?: 'top' | 'middle' | 'bottom';
  }) => React.ReactNode;
};

export const [StepperContextProvider, useStepperContext] =
  createOptionalContext<IStepperContextValue>();
