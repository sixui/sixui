import * as React from 'react';
import { type IFabProps, Fab } from './Fab';

export interface ITertiaryFabProps
  extends Omit<IFabProps, 'variant' | 'children'> {}

export const TertiaryFab: React.FC<ITertiaryFabProps> = (props) => (
  <Fab {...props} variant='tertiary' />
);
