import * as React from 'react';
import { type IButtonProps, Button } from './Button';

export type IOutlinedButtonProps = Omit<IButtonProps, 'variant'>;

export const OutlinedButton: React.FC<IOutlinedButtonProps> = (props) => (
  <Button {...props} variant='outlined' />
);
