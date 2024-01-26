import React from 'react';
import { type IFabProps, Fab } from './Fab';

export interface IPrimaryFabProps
  extends Omit<IFabProps, 'variant' | 'children'> {}

export const PrimaryFab: React.FC<IPrimaryFabProps> = (props) => (
  <Fab {...props} variant='primary' />
);
