export const variabletemplateVariants = ['variant'] as const;
export type IVariableTemplateVariant =
  (typeof variabletemplateVariants)[number];

export type IVariableTemplateStyleKey = 'host';

export type IVariableTemplateStyleVarKey = 'textColor';

export type IVariableTemplateStyleStateVarKey = 'varA';
