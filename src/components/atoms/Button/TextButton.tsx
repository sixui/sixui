import React from 'react';
import { type IButtonProps, Button } from './Button';

export interface ITextButtonProps extends Omit<IButtonProps, 'variant'> {}

export const TextButton: React.FC<ITextButtonProps> = (props) => (
  <Button {...props} variant='text' />
);
