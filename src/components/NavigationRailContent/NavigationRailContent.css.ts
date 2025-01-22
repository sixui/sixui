import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'with-divider' | 'justify';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  verticalSpace: px(40),
  divider: {
    width: px(themeTokens.outline.width.xs),
    color: themeTokens.colorScheme.outline,
  },
  container: {
    width: px(80),
    color: themeTokens.colorScheme.surface,
    shape: themeTokens.shape.corner.none,
    elevation: elevationLevelPreset[0],
  },
});

const classNames = createStyles({
  root: {
    width: tokens.container.width,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: calc.add(tokens.verticalSpace, DENSITY),

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        shape: tokens.container.shape,
        elevation: tokens.container.elevation,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('with-divider')]: {
        borderRightWidth: tokens.divider.width,
        borderRightColor: tokens.divider.color,
        borderRightStyle: 'solid',
      },
    },
  },
  header: {
    flexShrink: 0,
  },
  content: ({ root }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    overflowY: 'auto',
    gap: calc.add(px(space(3)), DENSITY),
    paddingTop: calc.add(px(space(3)), DENSITY),
    paddingBottom: calc.add(px(space(3)), DENSITY),

    selectors: {
      [getModifierSelector<IModifier>({ justify: 'start' }, root)]: {
        justifyContent: 'start',
      },
      [getModifierSelector<IModifier>({ justify: 'center' }, root)]: {
        justifyContent: 'center',
      },
      [getModifierSelector<IModifier>({ justify: 'end' }, root)]: {
        justifyContent: 'end',
      },
    },
  }),
  footer: {
    flexShrink: 0,
  },
});

export type INavigationRailContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const navigationRailContentTheme =
  componentThemeFactory<INavigationRailContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
