import type { IOmit } from '@/helpers/types';
import type { IChipProps } from './ChipProps';

export type IAssistChipProps = IOmit<
  IChipProps,
  'variant' | 'onDelete' | 'selected'
>;
