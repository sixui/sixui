import * as React from 'react';
import { type IButtonProps, Button } from './Button';

export type IElevatedButtonProps = Omit<IButtonProps, 'variant'>;

export const ElevatedButton: React.FC<IElevatedButtonProps> = (props) => (
  <Button {...props} variant='elevated' />
);
