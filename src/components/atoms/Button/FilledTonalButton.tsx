import React from 'react';
import { type IButtonProps, Button } from './Button';

export interface IFilledTonalButtonProps
  extends Omit<IButtonProps, 'variant'> {}

export const FilledTonalButton: React.FC<IFilledTonalButtonProps> = (props) => (
  <Button {...props} variant='filledTonal' />
);
