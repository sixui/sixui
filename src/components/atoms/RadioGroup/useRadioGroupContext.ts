import * as React from 'react';

import {
  type IRadioGroupContext,
  RadioGroupContext,
} from './RadioGroupContext';

export interface IRadioGroupState extends IRadioGroupContext {}

export const useRadioGroupContext = (): IRadioGroupState | undefined =>
  React.useContext(RadioGroupContext);
