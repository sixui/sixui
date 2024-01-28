import React from 'react';
import { type ITabProps, Tab } from './Tab';

export interface ISecondaryTabProps extends Omit<ITabProps, 'variant'> {}

export const SecondaryTab: React.FC<ISecondaryTabProps> = (props) => (
  <Tab {...props} variant='secondary' />
);
