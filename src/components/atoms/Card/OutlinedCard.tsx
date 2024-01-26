import React from 'react';
import { type ICardProps, Card } from './Card';

export interface IOutlinedCardProps extends Omit<ICardProps, 'variant'> {}

export const OutlinedCard: React.FC<IOutlinedCardProps> = (props) => (
  <Card {...props} variant='outlined' />
);
