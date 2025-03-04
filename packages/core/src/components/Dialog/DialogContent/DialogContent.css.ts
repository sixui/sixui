import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './DiagonalContent.constants';

type IModifier =
  | 'size'
  | 'scrollable'
  | 'with-icon'
  | 'with-headline'
  | 'with-actions';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: themeTokens.colorScheme.surfaceContainerHigh,
    elevation: elevationLevelPreset[3],
    shape: px(themeTokens.shape.corner.xl),
    width: {
      xs: px(200),
      sm: px(240),
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
    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        shape: tokens.container.shape,
        elevation: tokens.container.elevation,
      },
    }),

    display: 'flex',
    flexDirection: 'column',
    maxWidth: calc.subtract('100vw', px(32)),
    width: 'max-content',

    selectors: {
      [modifierSelector<IModifier>({ size: 'xs' })]: {
        width: tokens.container.width.xs,
      },
      [modifierSelector<IModifier>({ size: 'sm' })]: {
        width: tokens.container.width.sm,
      },
      [modifierSelector<IModifier>({ size: 'md' })]: {
        width: tokens.container.width.md,
      },
      [modifierSelector<IModifier>({ size: 'lg' })]: {
        width: tokens.container.width.lg,
      },
      [modifierSelector<IModifier>({ size: 'xl' })]: {
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
      [modifierSelector<IModifier>('!with-headline', root)]: {
        paddingTop: px(space('$xl')),
      },
    },
  }),
  icon: {
    color: tokens.icon.color,
    fill: 'currentColor',
    fontSize: tokens.icon.size,
    blockSize: tokens.icon.size,
    inlineSize: tokens.icon.size,
    marginTop: px(space('$xl')),
  },
  headline: ({ root }) => ({
    alignItems: 'center',
    alignSelf: 'stretch',
    boxSizing: 'border-box',
    display: 'flex',
    gap: px(space('$sm')),
    paddingTop: px(space('$xl')),
    paddingBottom: 0,
    paddingLeft: px(space('$xl')),
    paddingRight: px(space('$xl')),
    ...typography(tokens.headline.typography),

    selectors: {
      [modifierSelector<IModifier>('scrollable', root)]: {
        paddingBottom: px(space('$lg')),
      },
      [modifierSelector<IModifier>('with-icon', root)]: {
        justifyContent: 'center',
        paddingBottom: px(space('$lg')),
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
      [modifierSelector<IModifier>('scrollable', root)]: {
        // Only add scrollbars if the content is overflowing. This prevents
        // extra space from appearing on platforms that reserve scrollbar space.
        // Note: we only scroll vertically. Horizontal scrolling should be
        // handled by the content.
        overflowY: 'scroll',
      },
    },
  }),
  content: ({ root }) => ({
    paddingLeft: px(space('$xl')),
    paddingTop: px(space('$xl')),
    paddingRight: px(space('$xl')),
    color: tokens.supportingText.color,
    ...typography(tokens.supportingText.typography),
    height: 'min-content', // Needed for Safari
    position: 'relative',

    selectors: {
      [modifierSelector<IModifier>('with-headline', root)]: {
        paddingTop: px(space('$lg')),
        paddingBottom: px(space('$sm')),
      },
      [modifierSelector<IModifier>('scrollable', root)]: {
        paddingTop: 0,
        paddingBottom: px(space('$sm')),
      },
      [modifierSelector<IModifier>(['scrollable', 'with-headline'], root)]: {
        paddingBottom: px(space('$sm')),
      },
    },
  }),
  footer: ({ root }) => ({
    position: 'relative',
    paddingBottom: px(space('$xl')),

    selectors: {
      [modifierSelector<IModifier>('with-actions', root)]: {
        paddingBottom: 0,
      },
    },
  }),
  actions: {
    boxSizing: 'border-box',
    display: 'flex',
    gap: px(space('$sm')),
    justifyContent: 'flex-end',
    paddingTop: px(space('$lg')),
    paddingBottom: px(space('$xl')),
    paddingLeft: px(space('$xl')),
    paddingRight: px(space('$xl')),
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
