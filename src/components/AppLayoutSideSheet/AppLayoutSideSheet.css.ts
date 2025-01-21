import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier =
  | 'full-height'
  | 'with-header'
  | 'with-navigation-rail'
  | 'with-navigation-drawer'
  | 'with-aside';

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
      [getModifierSelector<IModifier>('with-navigation-rail')]: {
        width: appLayoutTheme.tokens.navigationRail.width,
        transitionDuration: themeTokens.motion.duration.long.$3,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
      [getModifierSelector<IModifier>('with-navigation-drawer')]: {
        width: appLayoutTheme.tokens.navigationDrawer.width,
        transitionDuration: themeTokens.motion.duration.long.$3,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
      [getModifierSelector<IModifier>('with-aside')]: {
        width: appLayoutTheme.tokens.aside.width,
        transitionDuration: themeTokens.motion.duration.long.$3,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
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
  modifier: IModifier;
}>;

export const appLayoutSideSheetTheme =
  componentThemeFactory<IAppLayoutSideSheetThemeFactory>({
    classNames,
    tokens: undefined,
  });
