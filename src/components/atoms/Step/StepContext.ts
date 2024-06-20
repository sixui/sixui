import { createContext } from 'react';

export type IStepContextValue = {
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'right' | 'bottom';
  completed?: boolean;
  hasText?: boolean;
  hasContent?: boolean;
};

export const StepContext = createContext<IStepContextValue | undefined>(
  undefined,
);
