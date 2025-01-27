import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

export type ICircularProgressIndicatorModifier = 'disabled' | 'negative';

const [tokensClassName, tokens] = createTheme({
  color: {
    normal: 'currentColor',
    negative: themeTokens.colorScheme.error,
    disabled: themeTokens.colorScheme.onSurface,
  },
  opacity: {
    disabled: themeTokens.state.opacity.disabled,
  },
  size: calc.multiply('1em', themeTokens.scale),
  containerPadding: px(0),
  strokeWidth: `round(up, ${px(2)}, 1px)`,
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

    width: tokens.size,
    height: tokens.size,

    selectors: {
      [getModifierSelector<ICircularProgressIndicatorModifier>('negative')]: {
        color: tokens.color.negative,
      },
    },
  },
  layer: {
    position: 'absolute',
    inset: 0,
    borderColor: 'inherit',
    borderRadius: 'inherit',
    overflow: 'hidden',
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
