import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ISvgIconStyleKey } from '@/components/atoms/SvgIcon';
import { componentVars as vars } from './SvgIcon.stylex';

// https://github.com/material-components/material-web/blob/main/icon/internal/_icon.scss
type IIconStyles = IStyles<ISvgIconStyleKey>;
export const styles: MapNamespaces<IIconStyles> = stylex.create<IIconStyles>({
  host: {
    fontSize: vars.size,
    width: vars.size,
    height: vars.size,
    color: 'inherit',
    fontVariationSettings: 'inherit',
    fontWeight: 400,
    fontFamily: vars.font,
    display: 'inline-flex',
    fontStyle: 'normal',
    lineHeight: 1,
    verticalAlign: 'middle',
    // Avoid displaying overflowing text if font ligatures have not loaded.
    overflow: 'hidden',
    letterSpacing: 'normal',
    textTransform: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',

    // Support for all WebKit browsers
    WebkitFontSmoothing: 'antialiased',
    // Support for Safari and Chrome
    textRendering: 'optimizeLegibility',
    // Support for Firefox
    MozOsxFontSmoothing: 'grayscale',
  },
  svg: {
    width: '100%',
    height: '100%',
  },
});
