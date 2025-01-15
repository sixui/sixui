import type { StyleXVar } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import { densityTokens } from '~/themes/base/density.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const MIN_DENSITY = -5;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

export const colorRoleStyles = stylex.create({
  host: {
    flexGrow: 1,
    paddingLeft: spacingTokens.padding$3,
    paddingRight: spacingTokens.padding$3,
    paddingTop: spacingTokens.padding$2,
    paddingBottom: spacingTokens.padding$2,
  },
  height$xs: { flexBasis: `calc(30px * ${scaleTokens.scale} + ${DENSITY})` },
  height$sm: { flexBasis: `calc(40px * ${scaleTokens.scale} + ${DENSITY})` },
  height$md: { flexBasis: `calc(50px * ${scaleTokens.scale} + ${DENSITY})` },
  height$lg: { flexBasis: `calc(65px * ${scaleTokens.scale} + ${DENSITY})` },
  height$xl: { flexBasis: `calc(75px * ${scaleTokens.scale} + ${DENSITY})` },
  color: (
    bg: string | StyleXVar<string>,
    text: string | StyleXVar<string>,
  ) => ({
    backgroundColor: bg,
    color: text,
  }),
  textarea: {
    width: '100%',
    height: '100%',
    resize: 'none',
    backgroundColor: 'unset',
  },
});
