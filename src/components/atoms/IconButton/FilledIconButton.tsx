import * as React from 'react';
import { type IIconButtonProps, IconButton } from './IconButton';

export interface IFilledIconButtonProps
  extends Omit<IIconButtonProps, 'variant'> {}

export const FilledIconButton: React.FC<IFilledIconButtonProps> = (props) => (
  <IconButton {...props} variant='filled' />
);
