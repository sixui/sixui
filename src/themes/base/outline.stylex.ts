import stylex from '@stylexjs/stylex';

import type { IOutlineTheme } from './outline.types';
import { scaleTokens } from './scale.stylex';

const vars = {
  width$none: '0px',
  width$1: `max(1px, 1px * ${scaleTokens.scale})`,
  width$2: `max(1px, 2px * ${scaleTokens.scale})`,
  width$3: `max(1px, 3px * ${scaleTokens.scale})`,
  width$4: `max(1px, 4px * ${scaleTokens.scale})`,
};

export const outlineTokens = stylex.defineVars<IOutlineTheme>(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const outlineTheme = stylex.createTheme(outlineTokens, vars);
