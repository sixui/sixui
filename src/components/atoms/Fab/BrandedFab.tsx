import type { IMakeRequired } from '@/helpers/types';
import * as React from 'react';
import { type IFabProps, Fab } from './Fab';

export interface IBrandedFabProps
  extends IMakeRequired<Omit<IFabProps, 'variant' | 'icon'>, 'children'> {}

export const BrandedFab: React.FC<IBrandedFabProps> = (props) => (
  <Fab {...props} variant='branded' />
);
