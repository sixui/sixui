import type { IAssistChipProps } from './AssistChipProps';
import { Chip } from './Chip';

export const AssistChip: React.FC<IAssistChipProps> = (props) => (
  <Chip {...props} variant='assist' />
);
