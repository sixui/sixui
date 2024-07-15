import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { variableTemplateTokens } from '../VariableTemplate.stylex';

export const secondaryVariableTemplateStyles = stylex.create({
  host: {
    [variableTemplateTokens.textColor]: colorRolesVars.secondary,
  },
});
