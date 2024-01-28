import React from 'react';
import { type ITabProps, Tab } from './Tab';

export interface IPrimaryTabProps extends Omit<ITabProps, 'variant'> {}

export const PrimaryTab: React.FC<IPrimaryTabProps> = (props) => (
  <Tab {...props} variant='primary' />
);
