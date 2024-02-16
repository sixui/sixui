import * as React from 'react';
import { type IChipProps, Chip } from './Chip';

export interface IAssistChipProps
  extends Omit<IChipProps, 'variant' | 'onDelete' | 'selected'> {}

export const AssistChip: React.FC<IAssistChipProps> = (props) => (
  <Chip {...props} variant='assist' />
);
