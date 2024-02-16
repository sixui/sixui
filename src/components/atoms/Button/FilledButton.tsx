import * as React from 'react';
import { type IButtonProps, Button } from './Button';

export interface IFilledButtonProps extends Omit<IButtonProps, 'variant'> {}

export const FilledButton: React.FC<IFilledButtonProps> = (props) => (
  <Button {...props} variant='filled' />
);
