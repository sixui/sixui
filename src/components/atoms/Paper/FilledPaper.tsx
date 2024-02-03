import React from 'react';
import { type IPaperProps, Paper } from './Paper';

export interface IFilledPaperProps extends Omit<IPaperProps, 'variant'> {}

export const FilledPaper: React.FC<IFilledPaperProps> = (props) => (
  <Paper {...props} variant='filled' />
);
