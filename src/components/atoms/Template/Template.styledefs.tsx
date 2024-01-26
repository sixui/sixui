export const templateVariants = ['variant'] as const;
export type ITemplateVariant = (typeof templateVariants)[number];

export type ITemplateStyleKey = 'host';

export type ITemplateStyleVarKey = 'var1';

export type ITemplateStyleStateVarKey = 'varA';
