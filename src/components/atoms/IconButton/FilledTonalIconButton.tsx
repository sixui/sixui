import React from 'react';
import { type IIconButtonProps, IconButton } from './IconButton';

export interface IFilledTonalIconButtonProps
  extends Omit<IIconButtonProps, 'variant'> {}

export const FilledTonalIconButton: React.FC<IFilledTonalIconButtonProps> = (
  props,
) => <IconButton {...props} variant='filledTonal' />;
