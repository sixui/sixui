import React from 'react';
import { type ITextFieldProps, TextField } from './TextField';

export interface IOutlinedTextFieldProps
  extends Omit<ITextFieldProps, 'variant'> {}

export const OutlinedTextField: React.FC<IOutlinedTextFieldProps> = (props) => (
  <TextField {...props} variant='outlined' />
);
