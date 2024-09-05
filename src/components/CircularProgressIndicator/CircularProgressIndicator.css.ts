import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  color: {
    normal: themeTokens.colorScheme.primary,
    disabled: themeTokens.colorScheme.onSurface,
  },
  opacity: {
    disabled: themeTokens.state.opacity.disabled,
  },
  size: calc.multiply('1em', themeTokens.scale),
  containerPadding: '0.05em',
  strokePct: '10',
});

const classNames = createStyles({
  root: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.color.normal,
    borderColor: 'currentColor',

    // `contain` and `content-visibility` are performance optimizations
    // important here because progress indicators are often used when a cpu
    // intensive task is underway so it's especially important to minimize their
    // cpu consumption.
    contain: 'strict',
    contentVisibility: 'auto',

    width: tokens.size,
    height: tokens.size,
  },
  layer: {
    position: 'absolute',
    inset: 0,
    borderColor: 'inherit',
  },
  progress: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    alignSelf: 'stretch',
    margin: px(tokens.containerPadding),
  },
});

export type ICircularProgressIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const circularProgressIndicatorTheme =
  componentThemeFactory<ICircularProgressIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
