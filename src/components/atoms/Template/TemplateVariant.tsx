import { type ITemplateProps, Template } from './Template';

export type IVariantTemplateProps = Omit<ITemplateProps, 'variant'>;

export const VariantTemplate: React.FC<IVariantTemplateProps> = (props) => (
  <Template {...props} variant='variant' />
);
