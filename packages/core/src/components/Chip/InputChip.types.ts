import type { IOmit } from '~/utils/types';
import type { IChipProps } from './Chip.types';

export type IInputChipProps = IOmit<IChipProps, 'variant' | 'elevated'>;
