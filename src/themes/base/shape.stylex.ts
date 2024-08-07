import stylex from '@stylexjs/stylex';

import type { IShapeTheme } from './shape.types';
import { scaleTokens } from './scale.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-shape.scss

const vars = {
  corner$full: '999px',

  corner$xl: `calc(28px * ${scaleTokens.scale})`,
  cornerTop$xl: `calc(28px * ${scaleTokens.scale}) calc(28px * ${scaleTokens.scale}) 0 0`,

  corner$lg: `calc(16px * ${scaleTokens.scale})`,
  cornerStart$lg: `calc(16px * ${scaleTokens.scale}) 0 0 calc(16px * ${scaleTokens.scale})`,
  cornerEnd$lg: `0 calc(16px * ${scaleTokens.scale}) calc(16px * ${scaleTokens.scale}) 0`,
  cornerTop$lg: `calc(16px * ${scaleTokens.scale}) calc(16px * ${scaleTokens.scale}) 0 0`,

  corner$md: `calc(12px * ${scaleTokens.scale})`,

  corner$sm: `calc(8px * ${scaleTokens.scale})`,

  corner$xs: `calc(6px * ${scaleTokens.scale})`,
  cornerTop$xs: `calc(6px * ${scaleTokens.scale}) calc(6px * ${scaleTokens.scale}) 0 0`,
  cornerBottom$xs: `0 0 calc(6px * ${scaleTokens.scale}) calc(6px * ${scaleTokens.scale})`,

  corner$none: '0px',
};

export const shapeTokens = stylex.defineVars<IShapeTheme>(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const shapeTheme = stylex.createTheme(shapeTokens, vars);
