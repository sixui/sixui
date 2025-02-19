import type { IOrientation } from '~/utils/types';
import { createOptionalContext } from '~/utils/react/createOptionalContext';

export type IStepperContextValue = {
  orientation?: IOrientation;
  labelPosition?: 'right' | 'bottom';
  activeStep?: number;
  loading?: boolean;
  completed?: boolean;
  connectorRenderer?: (props: {
    orientation?: IOrientation;
    part?: 'start' | 'content' | 'main' | 'end';
  }) => React.ReactNode;
};

export const [StepperContextProvider, useStepperContext] =
  createOptionalContext<IStepperContextValue>();
