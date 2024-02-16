import * as React from 'react';

import {
  type IRadioGroupContextValue,
  RadioGroupContext,
} from './RadioGroupContext';

export interface IRadioGroupState extends IRadioGroupContextValue {}

export const useRadioGroupContext = (): IRadioGroupState | undefined =>
  React.useContext(RadioGroupContext);
