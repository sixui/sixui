import React from 'react';
import { type ITabProps, Tab } from './Tab';

// https://github.com/material-components/material-web/blob/main/tabs/internal/primary-tab.ts

export interface IPrimaryTabProps extends Omit<ITabProps, 'variant'> {}

export const PrimaryTab: React.FC<IPrimaryTabProps> = (props) => (
  <Tab {...props} variant='primary' />
);
