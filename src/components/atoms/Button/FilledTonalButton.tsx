import * as React from 'react';
import { type IButtonProps, Button } from './Button';

export type IFilledTonalButtonProps = Omit<IButtonProps, 'variant'>;

export const FilledTonalButton: React.FC<IFilledTonalButtonProps> = (props) => (
  <Button {...props} variant='filledTonal' />
);
