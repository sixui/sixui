import * as React from 'react';
import { type IButtonProps, Button } from './Button';

export interface IElevatedButtonProps extends Omit<IButtonProps, 'variant'> {}

export const ElevatedButton: React.FC<IElevatedButtonProps> = (props) => (
  <Button {...props} variant='elevated' />
);
