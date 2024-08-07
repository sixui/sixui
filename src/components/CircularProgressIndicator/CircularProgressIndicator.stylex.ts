import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-circular-progress-indicator.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-circular-progress-indicator.scss

const DEFAULT_FONT_SIZE = 16;

const WIDTH = 2; // px

const SIZE = '1'; // em
const CONTAINER_PADDING = 0; // px

const vars = {
  color: colorSchemeTokens.primary,
  color$disabled: colorSchemeTokens.onSurface,
  size: `${SIZE}em`,
  containerPadding: `${CONTAINER_PADDING}px`,
  widthPct: `calc((${WIDTH} / (${SIZE} * ${DEFAULT_FONT_SIZE} -
  ${CONTAINER_PADDING} * 2)) * 100)`,
};

export const circularProgressIndicatorTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const circularProgressIndicatorTheme = stylex.createTheme(
  circularProgressIndicatorTokens,
  vars,
);
