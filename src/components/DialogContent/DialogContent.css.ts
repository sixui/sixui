import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { elevationLevelPreset } from '../Elevation/Elevation.css';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'scrollable' | 'with-icon' | 'with-headline' | 'with-actions';

const [tokensClassName, tokens] = createTheme({
  container: {
    color: themeTokens.colorScheme.surfaceContainerHigh,
    elevation: elevationLevelPreset[3],
    shape: {
      topLeft: px(themeTokens.shape.corner.xl),
      topRight: px(themeTokens.shape.corner.xl),
      bottomRight: px(themeTokens.shape.corner.xl),
      bottomLeft: px(themeTokens.shape.corner.xl),
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
        color: {
          normal: tokens.container.color,
        },
        shape: tokens.container.shape,
      },
    }),
  },
  dialog: {
    background: 'transparent',
    borderStyle: 'unset',
    borderRadius: 'inherit',
    flexDirection: 'column',
    height: 'inherit',
    margin: 'inherit',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
    minHeight: 'inherit',
    minWidth: 'inherit',
    outline: 'none',
    overflow: 'visible',
    padding: 0,
    width: 'inherit',
    display: 'flex',
  },
  container: {
    borderRadius: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    // Safari won't show content with "flex: 1", but container needs to grow if
    // height is set on the dialog, so use flex-grow instead.
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    transformOrigin: 'top',
  },
  header: {
    alignItems: 'center',
    color: tokens.headline.color,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    ...getTypographyStyles(tokens.headline.typography),
  },
  headline: {
    alignSelf: 'stretch',
    // unset: all
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    margin: 0,
  },
  headlineSlot: ({ root }) => ({
    alignItems: 'center',
    alignSelf: 'stretch',
    boxSizing: 'border-box',
    display: 'flex',
    gap: px(space(2)),
    paddingTop: px(space(6)),
    paddingBottom: 0,
    paddingLeft: px(space(6)),
    paddingRight: px(space(6)),

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
  icon: {
    display: 'flex',
  },
  iconSlot: {
    color: tokens.icon.color,
    fill: 'currentColor',
    fontSize: tokens.icon.size,
    blockSize: tokens.icon.size,
    inlineSize: tokens.icon.size,
    marginTop: px(space(6)),
  },
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
  content: {
    color: tokens.supportingText.color,
    ...getTypographyStyles(tokens.supportingText.typography),
    height: 'min-content', // Needed for Safari
    position: 'relative',
  },
  contentSlot: ({ root }) => ({
    boxSizing: 'border-box',
    paddingLeft: px(space(6)),
    paddingTop: px(space(6)),
    paddingRight: px(space(6)),

    selectors: {
      [getModifierSelector<IModifier>('with-headline', root)]: {
        paddingTop: px(space(4)),
        paddingBottom: px(space(2)),
      },
      [getModifierSelector<IModifier>('scrollable', root)]: {
        paddingBottom: px(space(2)),
      },
      [[
        getModifierSelector<IModifier>('scrollable', root),
        getModifierSelector<IModifier>('with-headline', root),
      ].join('')]: {
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
