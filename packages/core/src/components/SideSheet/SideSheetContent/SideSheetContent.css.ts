import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { ISideSheetContentVariant } from './SideSheetContent.types';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './SideSheetContent.constants';

type IModifier = 'side' | 'with-divider' | 'with-leading-actions';

const DENSITY = px(density({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: themeTokens.colorScheme.surface,
    shape: px(themeTokens.shape.corner.none),
    elevation: elevationLevelPreset[0],
  },
  header: {
    height: px(64),
    leadingSpace: {
      normal: px(space(6)),
      withIcons: px(space(6)),
    },
    trailingSpace: px(space(6)),
  },
  headline: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.title.lg,
  },
  divider: {
    width: themeTokens.outline.width.xs,
    color: themeTokens.colorScheme.outline,
  },
  topElements: {
    gap: px(space(3)),
  },
  bottomActions: {
    height: px(72),
    topSpace: px(space(4)),
    bottomSpace: px(space(6)),
    gap: px(space(6)),
  },
  content: {
    topSpace: px(space(4)),
    bottomSpace: px(space(4)),
  },
});

const classNames = createStyles({
  root: {
    flexShrink: 0,

    transitionProperty: 'border-radius',
    transitionDuration: themeTokens.motion.duration.short2,
    transitionTimingFunction: themeTokens.motion.easing.linear,

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
  inner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 'inherit',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
  },
  header: ({ root }) => ({
    height: tokens.header.height,
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: tokens.header.leadingSpace.normal,
    paddingRight: tokens.header.trailingSpace,
    gap: tokens.topElements.gap,

    selectors: {
      [modifierSelector<IModifier>('with-leading-actions', root)]: {
        paddingLeft: tokens.header.leadingSpace.withIcons,
      },
    },
  }),
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 0,
    gap: px(space(2)),
  },
  headline: {
    flexGrow: 1,
    color: tokens.headline.color,
    ...typography(tokens.headline.typography),
  },
  content: {
    height: '100%',
    overflowY: 'auto',
    paddingTop: calc.add(tokens.content.topSpace, DENSITY),
    paddingBottom: calc.add(tokens.content.bottomSpace, DENSITY),
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
  },
  footer: {
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: tokens.header.leadingSpace.normal,
    paddingRight: tokens.header.trailingSpace,
  },
});

export type ISideSheetContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: ISideSheetContentVariant;
}>;

export const sideSheetContentTheme =
  componentThemeFactory<ISideSheetContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });

export const sideSheetContentThemeVariants = {
  standard: createStyles(),
  drawer: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          color: themeTokens.colorScheme.surfaceContainerLow,
          elevation: elevationLevelPreset[1],
        },
        divider: {
          width: themeTokens.outline.width.none,
        },
        header: {
          leadingSpace: {
            withIcons: px(space(4)),
          },
        },
      }),

      selectors: {
        [modifierSelector<IModifier>({ side: 'left' })]: {
          vars: overrideTokens(tokens, {
            container: {
              shape: `0 ${px(themeTokens.shape.corner.lg)} ${px(themeTokens.shape.corner.lg)} 0`,
            },
          }),
        },
        [modifierSelector<IModifier>({ side: 'right' })]: {
          vars: overrideTokens(tokens, {
            container: {
              shape: `${px(themeTokens.shape.corner.lg)} 0 0 ${px(themeTokens.shape.corner.lg)}`,
            },
          }),
        },
      },
    },
  }),
  detachedDrawer: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          color: themeTokens.colorScheme.surfaceContainerLow,
          elevation: elevationLevelPreset[1],
        },
        divider: {
          width: themeTokens.outline.width.none,
        },
        header: {
          leadingSpace: {
            withIcons: px(space(4)),
          },
        },
      }),

      selectors: {
        [modifierSelector<IModifier>({ side: 'left' })]: {
          vars: overrideTokens(tokens, {
            container: {
              shape: themeTokens.shape.corner.lg,
            },
          }),
        },
        [modifierSelector<IModifier>({ side: 'right' })]: {
          vars: overrideTokens(tokens, {
            container: {
              shape: themeTokens.shape.corner.lg,
            },
          }),
        },
      },
    },
  }),
};
