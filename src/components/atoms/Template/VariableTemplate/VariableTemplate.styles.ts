import stylex from '@stylexjs/stylex';

import { variableTemplateTokens } from './VariableTemplate.stylex';

export type IVariableTemplateStylesKey = keyof typeof variableTemplateStyles;
export const variableTemplateStyles = stylex.create({
  host: {
    color: variableTemplateTokens.textColor,
  },
});
