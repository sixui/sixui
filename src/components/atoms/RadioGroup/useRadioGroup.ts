import React from 'react';

import {
  type IRadioGroupContextValue,
  RadioGroupContext,
} from './RadioGroupContext';

export interface IRadioGroupState extends IRadioGroupContextValue {}

export const useRadioGroup = (): IRadioGroupState | undefined =>
  React.useContext(RadioGroupContext);
