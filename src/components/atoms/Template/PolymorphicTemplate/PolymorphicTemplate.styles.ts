import stylex from '@stylexjs/stylex';

export type IPolymorphicTemplateStylesKey =
  keyof typeof polymorphicTemplateStyles;
export const polymorphicTemplateStyles = stylex.create({
  host: {},
});
