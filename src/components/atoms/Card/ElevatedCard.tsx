import React from 'react';
import { type ICardProps, Card } from './Card';

export interface IElevatedCardProps extends Omit<ICardProps, 'variant'> {}

export const ElevatedCard: React.FC<IElevatedCardProps> = (props) => (
  <Card {...props} variant='elevated' />
);
