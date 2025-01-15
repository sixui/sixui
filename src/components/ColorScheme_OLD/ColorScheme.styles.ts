import stylex from '@stylexjs/stylex';

import { scaleTokens } from '~/themes/base/scale.stylex';

export const colorSchemeStyles = stylex.create({
  grow: {
    flexGrow: 1,
    flexBasis: 0,
    alignItems: 'stretch',
  },
  width$sm: {
    width: `calc(240px * ${scaleTokens.scale})`,
  },
  width$lg: {
    width: `calc(600px * ${scaleTokens.scale})`,
  },
});
