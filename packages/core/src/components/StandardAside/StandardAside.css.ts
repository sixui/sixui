import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './StandardAside.constants';

type IModifier = 'opened' | 'side' | 'wide' | 'orientation';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    size: px(360),
    color: themeTokens.colorScheme.surface,
    startSpace: px(0),
    endSpace: px(0),
  },
});

const classNames = createStyles({
  root: {
    flexShrink: 0,

    transitionDuration: themeTokens.motion.duration.short3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,

    selectors: {
      [modifierSelector<IModifier>({ orientation: 'horizontal' })]: {
        position: 'sticky',
        top: tokens.container.startSpace,

        height: calc.subtract(
          '100vh',
          tokens.container.startSpace,
          tokens.container.endSpace,
        ),
        width: 0,
        transitionProperty: 'width',
      },
      [modifierSelector<IModifier>({ orientation: 'vertical' })]: {
        width: calc.subtract(
          '100vw',
          tokens.container.startSpace,
          tokens.container.endSpace,
        ),
        height: 0,
        transitionProperty: 'height',
      },
      [modifierSelector<IModifier>('opened')]: {
        transitionDuration: themeTokens.motion.duration.long3,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
      [modifierSelector<IModifier>({
        orientation: 'horizontal',
        opened: true,
      })]: {
        width: tokens.container.size,
      },
      [modifierSelector<IModifier>({
        orientation: 'vertical',
        opened: true,
      })]: {
        height: tokens.container.size,
      },
      [modifierSelector<IModifier>({
        orientation: 'horizontal',
        wide: true,
      })]: {
        top: 0,
        height: '100vh',
      },
      [modifierSelector<IModifier>({
        orientation: 'vertical',
        wide: true,
      })]: {
        width: '100vw',
      },
    },
  },
  transitionContainer: ({ root }) => ({
    selectors: {
      [modifierSelector<IModifier>({ orientation: 'horizontal' })]: {
        width: tokens.container.size,
        height: '100%',
      },
      [modifierSelector<IModifier>({ orientation: 'vertical' })]: {
        width: '100%',
        height: tokens.container.size,
      },
      [modifierSelector<IModifier>({ side: 'left' }, root)]: {
        float: 'right',
      },
      [modifierSelector<IModifier>({ side: 'right' }, root)]: {
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
