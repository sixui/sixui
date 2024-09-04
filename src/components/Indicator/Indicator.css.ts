import { createTheme, keyframes } from '@vanilla-extract/css';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'processing';

const [tokensClassName, tokens] = createTheme({
  container: {
    color: themeTokens.colorScheme.primary,
    size: '10px',
    shape: themeTokens.shape.corner.full,
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
    minWidth: px(tokens.container.size),
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

export type IIndicatorStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const indicatorStyles = stylesFactory<IIndicatorStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
