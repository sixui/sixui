import { createTheme } from '@vanilla-extract/css';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';

const [tokensClassName, tokens] = createTheme({
  color: {
    normal: themeTokens.colorScheme.primary,
    disabled: themeTokens.colorScheme.onSurface,
  },
  opacity: {
    disabled: themeTokens.state.opacity.disabled,
  },
  size: '1em',
  containerPadding: '0px',
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

    selectors: {
      [getModifierSelector({ size: 'xs' })]: {
        fontSize: '0.6em',
      },
      [getModifierSelector({ size: 'sm' })]: {
        fontSize: '0.8em',
      },
      [getModifierSelector({ size: 'lg' })]: {
        fontSize: '1.2em',
      },
      [getModifierSelector({ size: 'xl' })]: {
        fontSize: '1.4em',
      },
    },
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
    margin: tokens.containerPadding,
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
