import type { StyleXStyles } from '@stylexjs/stylex';

import type { IVariableTemplateVariant } from '../VariableTemplate.types';
import { primaryVariableTemplateStyles } from './PrimaryVariableTemplate.styles';
import { secondaryVariableTemplateStyles } from './SecondaryVariableTemplate.styles';

export const variableTemplateVariantStyles: {
  [key in IVariableTemplateVariant]: Record<string, StyleXStyles>;
} = {
  primary: primaryVariableTemplateStyles,
  secondary: secondaryVariableTemplateStyles,
};
