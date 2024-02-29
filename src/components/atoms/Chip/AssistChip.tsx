import * as React from 'react';
import { type IChipProps, Chip } from './Chip';

export type IAssistChipProps = Omit<
  IChipProps,
  'variant' | 'onDelete' | 'selected'
>;

export const AssistChip: React.FC<IAssistChipProps> = (props) => (
  <Chip {...props} variant='assist' />
);
