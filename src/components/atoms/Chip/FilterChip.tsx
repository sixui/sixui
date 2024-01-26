import React from 'react';
import { type IChipProps, Chip } from './Chip';

export interface IFilterChipProps
  extends Omit<
    IChipProps,
    'variant' | 'onDelete' | 'icon' | 'imageUrl' | 'href'
  > {}

export const FilterChip: React.FC<IFilterChipProps> = (props) => (
  <Chip {...props} variant='filter' />
);
