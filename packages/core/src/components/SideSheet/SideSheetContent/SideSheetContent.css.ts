import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { ISideSheetContentVariant } from './SideSheetContent.types';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './SideSheetContent.constants';

type IModifier = 'side' | 'with-divider' | 'with-leading-actions';

const DENSITY = px(getDensity({ min: -4, max: 0 }));

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

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        shape: tokens.container.shape,
        elevation: tokens.container.elevation,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>(['with-divider', { side: 'left' }])]: {
        borderRightWidth: tokens.divider.width,
        borderRightColor: tokens.divider.color,
        borderRightStyle: 'solid',
      },
      [getModifierSelector<IModifier>(['with-divider', { side: 'right' }])]: {
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
      [getModifierSelector<IModifier>('with-leading-actions', root)]: {
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
    ...getTypographyStyles(tokens.headline.typography),
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
  modal: createStyles({
    root: {
      vars: createTokensVars(tokens, {
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
        [getModifierSelector<IModifier>({ side: 'left' })]: {
          vars: createTokensVars(tokens, {
            container: {
              shape: `0 ${px(themeTokens.shape.corner.lg)} ${px(themeTokens.shape.corner.lg)} 0`,
            },
          }),
        },
        [getModifierSelector<IModifier>({ side: 'right' })]: {
          vars: createTokensVars(tokens, {
            container: {
              shape: `${px(themeTokens.shape.corner.lg)} 0 0 ${px(themeTokens.shape.corner.lg)}`,
            },
          }),
        },
      },
    },
  }),
  detachedModal: createStyles({
    root: {
      vars: createTokensVars(tokens, {
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
        [getModifierSelector<IModifier>({ side: 'left' })]: {
          vars: createTokensVars(tokens, {
            container: {
              shape: themeTokens.shape.corner.lg,
            },
          }),
        },
        [getModifierSelector<IModifier>({ side: 'right' })]: {
          vars: createTokensVars(tokens, {
            container: {
              shape: themeTokens.shape.corner.lg,
            },
          }),
        },
      },
    },
  }),
};
