import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { ISideSheetContentVariant } from './SideSheetContent.types';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'anchor' | 'with-divider' | 'with-leading-actions';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    color: themeTokens.colorScheme.surface,
    shape: themeTokens.shape.corner.none,
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
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flexShrink: 0,

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        shape: tokens.container.shape,
        elevation: tokens.container.elevation,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>([
        'with-divider',
        {
          anchor: 'left',
        },
      ])]: {
        borderRightWidth: tokens.divider.width,
        borderRightColor: tokens.divider.color,
        borderRightStyle: 'solid',
      },
      [getModifierSelector<IModifier>([
        'with-divider',
        {
          anchor: 'right',
        },
      ])]: {
        borderLeftWidth: tokens.divider.width,
        borderLeftColor: tokens.divider.color,
        borderLeftStyle: 'solid',
      },
    },
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
    paddingTop: tokens.content.topSpace,
    paddingBottom: tokens.content.bottomSpace,
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
  modal: createStyles(),
  detachedModal: createStyles(),
};
