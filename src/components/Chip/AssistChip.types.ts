import type { IOmit } from '~/helpers/types';
import type { IChipProps } from './Chip.types';

export type IAssistChipProps = IOmit<
  IChipProps,
  'variant' | 'onDelete' | 'selected'
>;
