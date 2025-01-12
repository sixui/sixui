import { createSafeContext } from '~/helpers/createSafeContext';

export type IStepContextValue = {
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'right' | 'bottom';
  completed?: boolean;
  hasText?: boolean;
  hasContent?: boolean;
};

export const [StepContextProvider, useStepContext] =
  createSafeContext<IStepContextValue>(
    'You forgot to wrap your component in <StepContext />.',
  );
