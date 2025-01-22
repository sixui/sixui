import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier =
  | 'full-height'
  | 'with-header'
  | 'opened'
  | 'navigation-rail'
  | 'navigation-drawer'
  | 'aside';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    width: px(300),
  },
});

const classNames = createStyles({
  root: {
    position: 'sticky',
    left: 0,
    top: 0,
    height: '100vh',
    width: 0,
    flexShrink: 0,

    transitionProperty: 'width',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,

    selectors: {
      [getModifierSelector<IModifier>('full-height')]: {
        height: '100vh',
        top: 0,
      },
      [getModifierSelector<IModifier>('with-header')]: {
        height: calc.subtract('100vh', appLayoutTheme.tokens.header.height),
        top: appLayoutTheme.tokens.header.height,
      },
      [getModifierSelector<IModifier>('opened')]: {
        width: tokens.container.width,
        transitionDuration: themeTokens.motion.duration.long.$3,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
      [getModifierSelector<IModifier>(['opened', 'navigation-rail'])]: {
        width: appLayoutTheme.tokens.navigationRail.width,
      },
      [getModifierSelector<IModifier>(['opened', 'navigation-drawer'])]: {
        width: appLayoutTheme.tokens.navigationDrawer.width,
      },
      [getModifierSelector<IModifier>(['opened', 'aside'])]: {
        width: appLayoutTheme.tokens.aside.width,
      },
    },
  },
  inner: {
    position: 'absolute',
    insetBlock: 0,
    insetInlineStart: 0,
  },
});

export type IAppLayoutSideSheetThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const appLayoutSideSheetTheme =
  componentThemeFactory<IAppLayoutSideSheetThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
