import type { IInputChipProps } from './InputChipProps';
import { Chip } from './Chip';

export const InputChip: React.FC<IInputChipProps> = (props) => (
  <Chip {...props} variant='input' />
);
