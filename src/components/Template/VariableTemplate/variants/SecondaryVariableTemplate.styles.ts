import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { variableTemplateTokens } from '../VariableTemplate.stylex';

export const secondaryVariableTemplateStyles = stylex.create({
  host: {
    [variableTemplateTokens.textColor]: colorSchemeTokens.secondary,
  },
});
