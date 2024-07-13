import type { IAssistChipProps } from './AssistChip.types';
import { Chip } from './Chip';

export const AssistChip: React.FC<IAssistChipProps> = (props) => (
  <Chip {...props} variant='assist' />
);
