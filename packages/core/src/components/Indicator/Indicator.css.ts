import { keyframes } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

type IModifier = 'processing';

const [tokensClassName, tokens] = createTheme({
  container: {
    color: themeTokens.colorScheme.primary,
    size: px(10),
    shape: px(themeTokens.shape.corner.circle),
    zIndex: '200',
  },
});

const processingKeyframes = keyframes({
  '0%': {
    opacity: 0.6,
    transform: 'scale(0)',
  },
  '100%': {
    opacity: 0,
    transform: 'scale(2.8)',
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    width: px(tokens.container.size),
    height: px(tokens.container.size),
    backgroundColor: tokens.container.color,
    borderRadius: px(tokens.container.shape),
    zIndex: tokens.container.zIndex,

    '::before': {
      content: '',
      position: 'absolute',
      inset: 0,
      backgroundColor: tokens.container.color,
      borderRadius: px(tokens.container.shape),
      zIndex: -1,
    },

    selectors: {
      [`${getModifierSelector<IModifier>('processing')}::before`]: {
        animation: `${processingKeyframes} 1000ms linear infinite`,
      },
    },
  },
});

export type IIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const indicatorTheme = componentThemeFactory<IIndicatorThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
