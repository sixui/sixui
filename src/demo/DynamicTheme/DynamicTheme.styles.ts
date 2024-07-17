import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';

export const dynamicThemeStyles = stylex.create({
  square: {
    width: 200,
    height: 200,
    backgroundColor: colorRolesTokens.primary,
    color: colorRolesTokens.onPrimary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
