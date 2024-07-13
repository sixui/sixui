import type { IOmit } from '@/helpers/types';
import type { IChipProps } from './Chip.types';

export type IInputChipProps = IOmit<IChipProps, 'variant' | 'elevated'>;
