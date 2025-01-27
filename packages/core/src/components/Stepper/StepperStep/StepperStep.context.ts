import { createSafeContext } from '~/helpers/createSafeContext';

export type IStepperStepContextValue = {
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'right' | 'bottom';
  completed?: boolean;
  hasText?: boolean;
  hasContent?: boolean;
};

export const [StepperStepContextProvider, useStepperStepContext] =
  createSafeContext<IStepperStepContextValue>(
    'You forgot to wrap your component in <StepperStepContext />.',
  );
