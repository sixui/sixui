import React from 'react';
import { type IIconButtonProps, IconButton } from './IconButton';

export interface IStandardIconButtonProps
  extends Omit<IIconButtonProps, 'variant'> {}

export const StandardIconButton: React.FC<IStandardIconButtonProps> = (
  props,
) => <IconButton {...props} variant='standard' />;
