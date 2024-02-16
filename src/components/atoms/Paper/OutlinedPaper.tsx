import * as React from 'react';
import { type IPaperProps, Paper } from './Paper';

export interface IOutlinedPaperProps extends Omit<IPaperProps, 'variant'> {}

export const OutlinedPaper: React.FC<IOutlinedPaperProps> = (props) => (
  <Paper {...props} variant='outlined' />
);
