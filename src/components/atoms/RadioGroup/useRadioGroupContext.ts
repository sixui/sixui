import { useContext } from 'react';

import {
  type IRadioGroupContext,
  RadioGroupContext,
} from './RadioGroupContext';

export const useRadioGroupContext = (): IRadioGroupContext | undefined => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('Radio must be used within a RadioGroup.');
  }

  return context;
};
