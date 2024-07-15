import type { IInputChipProps } from './InputChip.types';
import { Chip } from './Chip';

export const InputChip: React.FC<IInputChipProps> = (props) => (
  <Chip {...props} variant='input' />
);
