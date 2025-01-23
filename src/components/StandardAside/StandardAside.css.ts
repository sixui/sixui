import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'opened' | 'side' | 'wide' | 'orientation';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    size: px(360),
    color: themeTokens.colorScheme.surface,
    startSpace: px(0),
    endSpace: px(0),
  },
});

const classNames = createStyles({
  root: {
    position: 'sticky',
    flexShrink: 0,

    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,

    selectors: {
      [getModifierSelector<IModifier>({ orientation: 'horizontal' })]: {
        height: calc.subtract(
          '100vh',
          tokens.container.startSpace,
          tokens.container.endSpace,
        ),
        width: 0,
        transitionProperty: 'width',
      },
      [getModifierSelector<IModifier>({ orientation: 'vertical' })]: {
        width: calc.subtract(
          '100vw',
          tokens.container.startSpace,
          tokens.container.endSpace,
        ),
        height: 0,
        transitionProperty: 'height',
      },
      [getModifierSelector<IModifier>('opened')]: {
        transitionDuration: themeTokens.motion.duration.long.$3,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
      [getModifierSelector<IModifier>({
        orientation: 'horizontal',
        opened: true,
      })]: {
        width: tokens.container.size,
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        opened: true,
      })]: {
        height: tokens.container.size,
      },
      [getModifierSelector<IModifier>({
        orientation: 'horizontal',
        wide: true,
      })]: {
        height: '100vh',
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        wide: true,
      })]: {
        width: '100vw',
      },
    },
  },
  transitionContainer: ({ root }) => ({
    selectors: {
      [getModifierSelector<IModifier>({ orientation: 'horizontal' })]: {
        width: tokens.container.size,
      },
      [getModifierSelector<IModifier>({ orientation: 'vertical' })]: {
        height: tokens.container.size,
      },
      [getModifierSelector<IModifier>({ side: 'left' }, root)]: {
        float: 'right',
      },
      [getModifierSelector<IModifier>({ side: 'right' }, root)]: {
        float: 'left',
      },
    },
  }),
});

export type IStandardAsideThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const standardAsideTheme =
  componentThemeFactory<IStandardAsideThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
