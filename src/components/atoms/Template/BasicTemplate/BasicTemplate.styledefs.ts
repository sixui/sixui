export const basicTemplateVariants = ['variant'] as const;
export type IBasicTemplateVariant = (typeof basicTemplateVariants)[number];

export type IBasicTemplateStyleKey = 'host';

export type IBasicTemplateStyleVarKey = 'textColor';

export type IBasicTemplateStyleStateVarKey = 'varA';
