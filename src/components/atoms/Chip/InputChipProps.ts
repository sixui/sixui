import type { IOmit } from '@/helpers/types';
import type { IChipProps } from './ChipProps';

export type IInputChipProps = IOmit<IChipProps, 'variant' | 'elevated'>;
