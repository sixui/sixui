import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { variableTemplateTokens } from '../VariableTemplate.stylex';

export const primaryVariableTemplateStyles = stylex.create({
  host: {
    [variableTemplateTokens.textColor]: colorRolesTokens.primary,
  },
});
