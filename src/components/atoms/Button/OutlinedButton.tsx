import React from 'react';
import { type IButtonProps, Button } from './Button';

export interface IOutlinedButtonProps extends Omit<IButtonProps, 'variant'> {}

export const OutlinedButton: React.FC<IOutlinedButtonProps> = (props) => (
  <Button {...props} variant='outlined' />
);
