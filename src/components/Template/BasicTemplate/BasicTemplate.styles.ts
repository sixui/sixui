import stylex from '@stylexjs/stylex';

export type IBasicTemplateStylesKey = keyof typeof basicTemplateStyles;
export const basicTemplateStyles = stylex.create({
  host: {},
});
