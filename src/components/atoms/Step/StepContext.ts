import { createContext } from 'react';

export type IStepContext = {
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'right' | 'bottom';
  completed?: boolean;
  hasText?: boolean;
  hasContent?: boolean;
};

export const StepContext = createContext<IStepContext | undefined>(undefined);
