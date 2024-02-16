import * as React from 'react';
import { type ICardProps, Card } from './Card';

export interface IFilledCardProps extends Omit<ICardProps, 'variant'> {}

export const FilledCard: React.FC<IFilledCardProps> = (props) => (
  <Card {...props} variant='filled' />
);
