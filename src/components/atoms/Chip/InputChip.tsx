import * as React from 'react';
import { type IChipProps, Chip } from './Chip';

export type IInputChipProps = Omit<IChipProps, 'variant' | 'elevated'>;

export const InputChip: React.FC<IInputChipProps> = (props) => (
  <Chip {...props} variant='input' />
);
