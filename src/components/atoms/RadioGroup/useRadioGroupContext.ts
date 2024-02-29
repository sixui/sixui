import * as React from 'react';

import {
  type IRadioGroupContext,
  RadioGroupContext,
} from './RadioGroupContext';

export type IRadioGroupState = IRadioGroupContext;

export const useRadioGroupContext = (): IRadioGroupState | undefined =>
  React.useContext(RadioGroupContext);
