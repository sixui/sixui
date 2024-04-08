import { createContext } from 'react';

export type IStepContext = {
  completed?: boolean;
  hasContent?: boolean;
};

export const StepContext = createContext<IStepContext | undefined>(undefined);
