import { type ITextFieldProps, TextField } from './TextField';
import * as React from 'react';

export interface IFilledTextFieldProps
  extends Omit<ITextFieldProps, 'variant'> {}

export const FilledTextField: React.FC<IFilledTextFieldProps> = (props) => (
  <TextField {...props} variant='filled' />
);
