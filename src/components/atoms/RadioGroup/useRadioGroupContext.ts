import { useContext } from 'react';

import {
  type IRadioGroupContext,
  RadioGroupContext,
} from './RadioGroupContext';

export const useRadioGroupContext = (): IRadioGroupContext | undefined =>
  useContext(RadioGroupContext);
