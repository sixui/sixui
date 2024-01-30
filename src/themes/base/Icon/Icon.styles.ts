import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IIconStyleKey } from '@/components/atoms/Icon';
import { componentVars as vars } from './Icon.stylex';

// https://github.com/material-components/material-web/blob/main/icon/internal/_icon.scss
type IIconStyles = IStyles<IIconStyleKey>;
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
