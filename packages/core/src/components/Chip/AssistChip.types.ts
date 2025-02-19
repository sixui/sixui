import type { IOmit } from '~/utils/types';
import type { IChipProps } from './Chip.types';

export type IAssistChipProps = IOmit<
  IChipProps,
  'variant' | 'onTrailingClick' | 'selected'
>;
