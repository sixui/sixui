import type { IOmit } from '@/helpers/types';
import { type IChipProps, Chip } from './Chip';

export type IAssistChipProps = IOmit<
  IChipProps,
  'variant' | 'onDelete' | 'selected'
>;

export const AssistChip: React.FC<IAssistChipProps> = (props) => (
  <Chip {...props} variant='assist' />
);
