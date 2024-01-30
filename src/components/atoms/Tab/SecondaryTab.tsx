import React from 'react';
import { type ITabProps, Tab } from './Tab';

// https://github.com/material-components/material-web/blob/main/tabs/internal/secondary-tab.ts

export interface ISecondaryTabProps extends Omit<ITabProps, 'variant'> {}

export const SecondaryTab: React.FC<ISecondaryTabProps> = (props) => (
  <Tab {...props} variant='secondary' />
);
