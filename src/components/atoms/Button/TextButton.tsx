import * as React from 'react';
import { type IButtonProps, Button } from './Button';

export type ITextButtonProps = Omit<IButtonProps, 'variant'>;

export const TextButton: React.FC<ITextButtonProps> = (props) => (
  <Button {...props} variant='text' />
);
