import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './NavigationRailContent.constants';

type IModifier = 'with-divider' | 'justify' | 'side';

const DENSITY = px(density({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  verticalSpace: px(40),
  divider: {
    width: px(themeTokens.outline.width.xs),
    color: themeTokens.colorScheme.outline,
  },
  topAppBar: {
    height: px(64),
  },
  container: {
    width: px(80),
    color: themeTokens.colorScheme.surface,
    shape: px(themeTokens.shape.corner.none),
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
  header: ({ root }) => ({
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'start',

    selectors: {
      [modifierSelector<IModifier>({ justify: 'center' }, root)]: {
        flexGrow: 1,
      },
      [modifierSelector<IModifier>({ justify: 'bottom' }, root)]: {
        flexGrow: 1,
      },
    },
  }),
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
    gap: calc.add(px(space('$md')), DENSITY),
    paddingTop: calc.add(px(space('$md')), DENSITY),
    paddingBottom: calc.add(px(space('$md')), DENSITY),
  },
  footer: ({ root }) => ({
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'end',

    selectors: {
      [modifierSelector<IModifier>({ justify: 'center' }, root)]: {
        flexGrow: 1,
      },
      [modifierSelector<IModifier>({ justify: 'top' }, root)]: {
        flexGrow: 1,
      },
    },
  }),
  menuIconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: tokens.topAppBar.height,
  },
  fabContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: px(space('$lg')),
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
