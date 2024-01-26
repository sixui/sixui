import React from 'react';
import { type IFabProps, Fab } from './Fab';

export interface ISurfaceFabProps
  extends Omit<IFabProps, 'variant' | 'children'> {}

export const SurfaceFab: React.FC<ISurfaceFabProps> = (props) => (
  <Fab {...props} variant='surface' />
);
