import { keyframes } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './Indicator.constants';

type IModifier = 'processing';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
      [`${modifierSelector<IModifier>('processing')}::before`]: {
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
