import * as React from 'react';
import { type IIconButtonProps, IconButton } from './IconButton';

export interface IOutlinedIconButtonProps
  extends Omit<IIconButtonProps, 'variant'> {}

export const OutlinedIconButton: React.FC<IOutlinedIconButtonProps> = (
  props,
) => <IconButton {...props} variant='outlined' />;
