import { createTheme, fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { NavigationRailContent } from '../NavigationRailContent';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier = 'opened' | 'side';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    width: fallbackVar(appLayoutTheme.tokens.navigationRail.width, px(80)),
    color: fallbackVar(
      appLayoutTheme.tokens.navigationRail.color,
      themeTokens.colorScheme.surface,
    ),
    topSpace: px(0),
    bottomSpace: px(0),
  },
  divider: {
    color: fallbackVar(
      appLayoutTheme.tokens.divider.color,
      themeTokens.colorScheme.outline,
    ),
    width: fallbackVar(
      appLayoutTheme.tokens.divider.width,
      themeTokens.outline.width.xs,
    ),
  },
});

const classNames = createStyles({
  root: {
    // position: 'sticky',
    // height: calc.subtract(
    //   '100vh',
    //   tokens.container.topSpace,
    //   tokens.container.bottomSpace,
    // ),
    // width: 0,
    // flexShrink: 0,
    // transitionProperty: 'width',
    // transitionDuration: themeTokens.motion.duration.short.$3,
    // transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
    // selectors: {
    //   [getModifierSelector<IModifier>('opened')]: {
    //     width: tokens.container.width,
    //     transitionDuration: themeTokens.motion.duration.long.$3,
    //     transitionTimingFunction:
    //       themeTokens.motion.easing.emphasized.decelerate,
    //   },
    // },
  },
  navigationRailContent: {
    height: '100%',
    width: tokens.container.width,

    vars: createTokensVars(NavigationRailContent.theme.tokens, {
      container: {
        width: tokens.container.width,
        color: tokens.container.color,
      },
      divider: {
        color: tokens.divider.color,
        width: tokens.divider.width,
      },
    }),
  },
  transitionContainer: ({ root }) => ({
    display: 'flex',
    height: '100%',

    selectors: {
      [getModifierSelector<IModifier>({ side: 'left' }, root)]: {
        justifyContent: 'end',
      },
      [getModifierSelector<IModifier>({ side: 'right' }, root)]: {
        justifyContent: 'start',
      },
    },
  }),
});

export type INavigationRailThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const navigationRailTheme =
  componentThemeFactory<INavigationRailThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
