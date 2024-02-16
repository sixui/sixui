import * as React from 'react';
import { type ITemplateProps, Template } from './Template';

export interface IVariantTemplateProps
  extends Omit<ITemplateProps, 'variant'> {}

export const VariantTemplate: React.FC<IVariantTemplateProps> = (props) => (
  <Template {...props} variant='variant' />
);
