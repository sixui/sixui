import stylex from '@stylexjs/stylex';

import type { ISpacingTheme } from './spacing.types';
import { scaleTokens } from './scale.stylex';

const SCALE = `clamp(${scaleTokens.minScale}, ${scaleTokens.scale}, ${scaleTokens.maxScale})`;

const PADDING_UNIT = '4px';
const PADDING_SCALE = `calc(${PADDING_UNIT} * ${SCALE})`;

const MARGIN_UNIT = '8px';
const MARGIN_SCALE = `calc(${MARGIN_UNIT} * ${SCALE})`;

const vars = {
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
};

export const spacingTokens = stylex.defineVars<ISpacingTheme>(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const spacingTheme = stylex.createTheme(spacingTokens, vars);
