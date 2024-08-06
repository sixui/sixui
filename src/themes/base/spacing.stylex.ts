import stylex from '@stylexjs/stylex';

import type { ISpacingTheme } from './spacing.types';
import { densityTokens } from './density.stylex';

const DENSITY_SCALE = `clamp(${densityTokens.scale}, ${densityTokens.minScale}, ${densityTokens.maxScale})`;

const PADDING_UNIT = '4px';
const PADDING_SCALE = `calc(${PADDING_UNIT} * ${DENSITY_SCALE})`;

const MARGIN_UNIT = '8px';
const MARGIN_SCALE = `calc(${MARGIN_UNIT} * ${DENSITY_SCALE})`;

export const spacingTokens = stylex.defineVars<ISpacingTheme>({
  paddingScale: PADDING_SCALE,
  padding$0: '0',
  padding$1: `calc(${PADDING_SCALE} * 1)`,
  padding$2: `calc(${PADDING_SCALE} * 2)`,
  padding$3: `calc(${PADDING_SCALE} * 3)`,
  padding$4: `calc(${PADDING_SCALE} * 4)`,
  padding$5: `calc(${PADDING_SCALE} * 5)`,
  padding$6: `calc(${PADDING_SCALE} * 6)`,

  marginScale: MARGIN_SCALE,
  margin$0: '0',
  margin$1: `calc(${MARGIN_SCALE} * 1)`,
  margin$2: `calc(${MARGIN_SCALE} * 2)`,
  margin$3: `calc(${MARGIN_SCALE} * 3)`,
  margin$4: `calc(${MARGIN_SCALE} * 4)`,
  margin$5: `calc(${MARGIN_SCALE} * 5)`,
  margin$6: `calc(${MARGIN_SCALE} * 6)`,
});
