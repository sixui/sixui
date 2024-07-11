export const polymorphicTemplateVariants = ['variant'] as const;
export type IPolymorphicTemplateVariant =
  (typeof polymorphicTemplateVariants)[number];

export type IPolymorphicTemplateStyleKey = 'host';

export type IPolymorphicTemplateStyleVarKey = 'textColor';

export type IPolymorphicTemplateStyleStateVarKey = 'varA';
