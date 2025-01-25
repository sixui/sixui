import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { cssLayers, themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';

type IModifier =
  | 'size'
  | 'scrollable'
  | 'with-icon'
  | 'with-headline'
  | 'with-actions';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    color: themeTokens.colorScheme.surfaceContainerHigh,
    elevation: elevationLevelPreset[3],
    shape: px(themeTokens.shape.corner.xl),
    width: {
      xs: px(160),
      sm: px(200),
      md: px(340),
      lg: px(400),
      xl: px(500),
    },
  },
  icon: {
    color: themeTokens.colorScheme.secondary,
    size: px(18),
  },
  headline: {
    color: themeTokens.colorScheme.onSurface,
    typography: themeTokens.typeScale.headline.sm,
  },
  supportingText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.body.md,
  },
  actionLabelText: {
    color: {
      normal: themeTokens.colorScheme.primary,
      focused: themeTokens.colorScheme.primary,
      hovered: themeTokens.colorScheme.primary,
      pressed: themeTokens.colorScheme.primary,
    },
    typography: themeTokens.typeScale.label.lg,
  },
  stateLayer: {
    color: {
      hovered: themeTokens.colorScheme.primary,
      pressed: themeTokens.colorScheme.primary,
    },
    opacity: {
      hovered: themeTokens.state.stateLayerOpacity.hovered,
      pressed: themeTokens.state.stateLayerOpacity.pressed,
    },
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        shape: tokens.container.shape,
      },
    }),

    display: 'flex',
    flexDirection: 'column',
    maxWidth: calc.subtract('100vw', px(space(8))),

    selectors: {
      [getModifierSelector<IModifier>({ size: 'xs' })]: {
        width: tokens.container.width.xs,
      },
      [getModifierSelector<IModifier>({ size: 'sm' })]: {
        width: tokens.container.width.sm,
      },
      [getModifierSelector<IModifier>({ size: 'md' })]: {
        width: tokens.container.width.md,
      },
      [getModifierSelector<IModifier>({ size: 'lg' })]: {
        width: tokens.container.width.lg,
      },
      [getModifierSelector<IModifier>({ size: 'xl' })]: {
        width: tokens.container.width.xl,
      },
    },
  },
  header: ({ root }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: tokens.headline.color,

    selectors: {
      [getModifierSelector<IModifier>('!with-headline', root)]: {
        paddingTop: px(space(6)),
      },
    },
  }),
  icon: {
    color: tokens.icon.color,
    fill: 'currentColor',
    fontSize: tokens.icon.size,
    blockSize: tokens.icon.size,
    inlineSize: tokens.icon.size,
    marginTop: px(space(6)),
  },
  headline: ({ root }) => ({
    alignItems: 'center',
    alignSelf: 'stretch',
    boxSizing: 'border-box',
    display: 'flex',
    gap: px(space(2)),
    paddingTop: px(space(6)),
    paddingBottom: 0,
    paddingLeft: px(space(6)),
    paddingRight: px(space(6)),
    ...getTypographyStyles(tokens.headline.typography),

    selectors: {
      [getModifierSelector<IModifier>('scrollable', root)]: {
        paddingBottom: px(space(4)),
      },
      [getModifierSelector<IModifier>('with-icon', root)]: {
        justifyContent: 'center',
        paddingBottom: px(space(4)),
      },
    },
  }),
  scroller: ({ root }) => ({
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0.0%',
    flexDirection: 'column',
    overflow: 'hidden',
    // Needed to display scrollbars on Chrome linux. Also needs to be > 0 so
    // that content that is `position: fixed` in the content can render above
    // the actions bar.
    zIndex: 1,

    selectors: {
      [getModifierSelector<IModifier>('scrollable', root)]: {
        // Only add scrollbars if the content is overflowing. This prevents
        // extra space from appearing on platforms that reserve scrollbar space.
        // Note: we only scroll vertically. Horizontal scrolling should be
        // handled by the content.
        overflowY: 'scroll',
      },
    },
  }),
  content: ({ root }) => ({
    paddingLeft: px(space(6)),
    paddingTop: px(space(6)),
    paddingRight: px(space(6)),
    color: tokens.supportingText.color,
    ...getTypographyStyles(tokens.supportingText.typography),
    height: 'min-content', // Needed for Safari
    position: 'relative',

    selectors: {
      [getModifierSelector<IModifier>('with-headline', root)]: {
        paddingTop: px(space(4)),
        paddingBottom: px(space(2)),
      },
      [getModifierSelector<IModifier>('scrollable', root)]: {
        paddingTop: 0,
        paddingBottom: px(space(2)),
      },
      [getModifierSelector<IModifier>(['scrollable', 'with-headline'], root)]: {
        paddingBottom: px(space(2)),
      },
    },
  }),
  footer: ({ root }) => ({
    position: 'relative',
    paddingBottom: px(space(6)),

    selectors: {
      [getModifierSelector<IModifier>('with-actions', root)]: {
        paddingBottom: 0,
      },
    },
  }),
  actions: {
    boxSizing: 'border-box',
    display: 'flex',
    gap: px(space(2)),
    justifyContent: 'flex-end',
    paddingTop: px(space(4)),
    paddingBottom: px(space(6)),
    paddingLeft: px(space(6)),
    paddingRight: px(space(6)),
  },
  divider: {
    display: 'none',
    position: 'absolute',
  },
  headlineDivider: {
    bottom: 0,
  },
  headlineDivider$showTopDivider: {
    display: 'flex',
  },
  actionsDivider: {
    top: 0,
  },
  actionsDivider$showBottomDivider: {
    display: 'flex',
  },
});

export type IDialogContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const dialogContentTheme =
  componentThemeFactory<IDialogContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
