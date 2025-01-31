import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './NavigationRailContent.constants';

type IModifier = 'with-divider' | 'justify' | 'side';

const DENSITY = px(density({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        shape: tokens.container.shape,
        elevation: tokens.container.elevation,
      },
    }),

    selectors: {
      [modifierSelector<IModifier>(['with-divider', { side: 'left' }])]: {
        borderRightWidth: tokens.divider.width,
        borderRightColor: tokens.divider.color,
        borderRightStyle: 'solid',
      },
      [modifierSelector<IModifier>(['with-divider', { side: 'right' }])]: {
        borderLeftWidth: tokens.divider.width,
        borderLeftColor: tokens.divider.color,
        borderLeftStyle: 'solid',
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
      [modifierSelector<IModifier>({ justify: 'start' }, root)]: {
        justifyContent: 'start',
      },
      [modifierSelector<IModifier>({ justify: 'center' }, root)]: {
        justifyContent: 'center',
      },
      [modifierSelector<IModifier>({ justify: 'end' }, root)]: {
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
