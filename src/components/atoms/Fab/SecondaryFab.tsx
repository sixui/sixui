import * as React from 'react';
import { type IFabProps, Fab } from './Fab';

export interface ISecondaryFabProps
  extends Omit<IFabProps, 'variant' | 'children'> {}

export const SecondaryFab: React.FC<ISecondaryFabProps> = (props) => (
  <Fab {...props} variant='secondary' />
);
