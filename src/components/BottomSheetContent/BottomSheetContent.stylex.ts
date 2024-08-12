import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';

const vars = {
  // container
  containerColor: colorSchemeTokens.surfaceContainerLow,
  containerElevation: elevationTokens.boxShadow$level1,
  containerShape$topLeft: shapeTokens.corner$xl,
  containerShape$topRight: shapeTokens.corner$xl,
  containerShape$bottomLeft: shapeTokens.corner$none,
  containerShape$bottomRight: shapeTokens.corner$none,

  // dragHandle
  dragHandleColor: colorSchemeTokens.onSurfaceVariant,
  dragHandleOpacity: '0.4',
  dragHandleWidth: `calc(32px * ${scaleTokens.scale})`,
  dragHandleHeight: `calc(4px * ${scaleTokens.scale})`,
  dragHandleTopSpace: `calc(22px * ${scaleTokens.scale})`,
  dragHandleBottomSpace: `calc(22px * ${scaleTokens.scale})`,
};

export const bottomSheetContentTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const bottomSheetContentTheme = stylex.createTheme(
  bottomSheetContentTokens,
  vars,
);
