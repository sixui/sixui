import type { IOmit } from '@/helpers/types';
import { type IChipProps, Chip } from './Chip';

export type IInputChipProps = IOmit<IChipProps, 'variant' | 'elevated'>;

export const InputChip: React.FC<IInputChipProps> = (props) => (
  <Chip {...props} variant='input' />
);
