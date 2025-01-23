import { createTheme, fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { SideSheetContent } from '../SideSheetContent';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier = 'opened' | 'side';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    width: fallbackVar(appLayoutTheme.tokens.aside.width, px(360)),
    color: fallbackVar(
      appLayoutTheme.tokens.aside.color,
      themeTokens.colorScheme.surface,
    ),
    topSpace: px(0),
    bottomSpace: px(0),
  },
});

const classNames = createStyles({
  root: {
    position: 'sticky',
    height: calc.subtract(
      '100vh',
      tokens.container.topSpace,
      tokens.container.bottomSpace,
    ),
    width: 0,
    flexShrink: 0,

    transitionProperty: 'width',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,

    selectors: {
      [getModifierSelector<IModifier>('opened')]: {
        width: tokens.container.width,
        transitionDuration: themeTokens.motion.duration.long.$3,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
    },
  },
  sideSheetContent: {
    height: '100%',
    width: tokens.container.width,

    vars: createTokensVars(SideSheetContent.theme.tokens, {
      container: {
        color: tokens.container.color,
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
