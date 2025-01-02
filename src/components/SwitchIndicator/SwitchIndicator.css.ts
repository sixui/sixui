import { createTheme, fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'on'
  | 'checked'
  | 'with-icon'
  | 'loading';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  width: px(52),
  height: px(32),
  container$off: {
    color: {
      normal: themeTokens.colorScheme.surfaceContainerHighest,
      disabled: themeTokens.colorScheme.surfaceContainerHighest,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  container$on: {
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  outline$off: {
    width: {
      normal: px(themeTokens.outline.width.sm),
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  outline$on: {
    width: {
      normal: px(themeTokens.outline.width.none),
    },
    opacity: {
      // disabled: themeTokens.state.outlineOpacity.disabled,
      disabled: '0',
    },
  },
  handle$off: {
    width: {
      normal: px(16),
      withIcon: px(24),
      pressed: px(28),
    },
    height: {
      normal: px(16),
      withIcon: px(24),
      pressed: px(28),
    },
    color: {
      normal: themeTokens.colorScheme.outline,
      hovered: themeTokens.colorScheme.onSurfaceVariant,
      focused: themeTokens.colorScheme.onSurfaceVariant,
      pressed: themeTokens.colorScheme.onSurfaceVariant,
      disabled: themeTokens.colorScheme.onSurfaceVariant,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  handle$on: {
    width: {
      normal: px(24),
      withIcon: px(24),
      pressed: px(28),
    },
    height: {
      normal: px(24),
      withIcon: px(24),
      pressed: px(28),
    },
    color: {
      normal: themeTokens.colorScheme.onPrimary,
      hovered: themeTokens.colorScheme.primaryContainer,
      focused: themeTokens.colorScheme.primaryContainer,
      pressed: themeTokens.colorScheme.primaryContainer,
      disabled: themeTokens.colorScheme.surface,
    },
    opacity: {
      disabled: '1',
    },
  },
  icon: {
    color: {
      normal: themeTokens.colorScheme.surfaceContainerHighest,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.surface,
    },
    opacity: {
      disabled: '0.76',
    },
    size: px(16),
  },
  icon$checked: {
    color: {
      normal: themeTokens.colorScheme.onPrimaryContainer,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.surface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    size: 'inherit',
  },
});

const classNames = createStyles({
  root: {
    display: 'inline-flex',
    verticalAlign: 'top',
    width: tokens.width,
    height: calc.add(tokens.height, DENSITY),

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container$off.color.normal,
        shape: px(themeTokens.shape.corner.full),
      },
      outline: {
        width: px(tokens.outline$off.width.normal),
        opacity: tokens.container$off.opacity.disabled,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container$off.color.disabled,
            opacity: tokens.container$off.opacity.disabled,
          },
          outline: {
            opacity: tokens.outline$off.opacity.disabled,
          },
        }),
      },
      [getModifierSelector<IModifier>('on')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container$on.color.normal,
          },
          outline: {
            width: px(tokens.outline$on.width.normal),
          },
        }),
      },
      [getModifierSelector<IModifier>(['on', 'disabled'])]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container$on.color.disabled,
            opacity: tokens.container$on.opacity.disabled,
          },
          outline: {
            opacity: tokens.outline$on.opacity.disabled,
          },
        }),
      },
      [getModifierSelector<IModifier>('hovered')]: {
        zIndex: 1,
      },
    },
  },
  track: {
    position: 'absolute',
    width: '100%',
    height: '100%',

    borderRadius: 'inherit',

    // Center content
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleContainer: ({ root }) => ({
    display: 'flex',
    placeContent: 'center',
    placeItems: 'center',
    position: 'relative',
    // This easing is custom to perform the "overshoot" animation.
    transitionProperty: 'margin',
    transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    transitionDuration: themeTokens.motion.duration.medium.$2,

    marginInlineEnd: `calc(${tokens.width} - ${tokens.height})`,
    marginInlineStart: 0,

    selectors: {
      [getModifierSelector<IModifier>('checked', root)]: {
        marginInlineStart: `calc(${tokens.width} - ${tokens.height})`,
        marginInlineEnd: 0,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        transitionProperty: 'none',
      },
    },
  }),
  handle: ({ root }) => ({
    position: 'relative',
    transformOrigin: 'center',
    transitionProperty: 'width, height',
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    transitionDuration: themeTokens.motion.duration.medium.$2,
    width: tokens.handle$off.width.normal,
    height: tokens.handle$off.height.normal,

    vars: {
      ...createTokensVars(PaperBase.theme.tokens, {
        container: {
          color: tokens.handle$off.color.normal,
          shape: px(themeTokens.shape.corner.full),
        },
      }),
    },
    selectors: {
      [getModifierSelector<IModifier>(
        {
          on: false,
          focused: true,
        },
        root,
      )]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$off.color.focused,
              tokens.handle$off.color.normal,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>(
        {
          on: false,
          hovered: true,
        },
        root,
      )]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$off.color.hovered,
              tokens.handle$off.color.normal,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>(
        {
          on: false,
          pressed: true,
        },
        root,
      )]: {
        width: tokens.handle$off.width.pressed,
        height: calc.add(tokens.handle$off.height.pressed, DENSITY),
        transitionTimingFunction: themeTokens.motion.easing.standard.normal,
        transitionDuration: themeTokens.motion.duration.short.$3,

        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$off.color.pressed,
              tokens.handle$off.color.normal,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>(
        {
          on: false,
          disabled: true,
        },
        root,
      )]: {
        cursor: 'default',

        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.handle$off.color.disabled,
            opacity: tokens.handle$off.opacity.disabled,
          },
        }),
      },
      [getModifierSelector<IModifier>(
        {
          on: false,
          pressed: false,
          'with-icon': true,
        },
        root,
      )]: {
        width: tokens.handle$off.width.withIcon,
        height: calc.add(tokens.handle$off.height.withIcon, DENSITY),
      },
      [getModifierSelector<IModifier>({ on: true }, root)]: {
        width: tokens.handle$on.width.normal,
        height: tokens.handle$on.height.normal,

        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.handle$on.color.normal,
          },
        }),
      },
      [getModifierSelector<IModifier>(
        {
          on: true,
          focused: true,
        },
        root,
      )]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$on.color.focused,
              tokens.handle$on.color.normal,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>(
        {
          on: true,
          hovered: true,
        },
        root,
      )]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$on.color.hovered,
              tokens.handle$on.color.normal,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>(
        {
          on: true,
          pressed: true,
        },
        root,
      )]: {
        width: tokens.handle$on.width.pressed,
        height: calc.add(tokens.handle$on.height.pressed, DENSITY),
        transitionTimingFunction: themeTokens.motion.easing.standard.normal,
        transitionDuration: themeTokens.motion.duration.short.$3,

        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$on.color.pressed,
              tokens.handle$on.color.normal,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>(
        {
          on: true,
          disabled: true,
        },
        root,
      )]: {
        cursor: 'default',

        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.handle$on.color.disabled,
            opacity: tokens.handle$on.opacity.disabled,
          },
        }),
      },
      [getModifierSelector<IModifier>(
        {
          on: true,
          pressed: false,
          'with-icon': true,
        },
        root,
      )]: {
        width: tokens.handle$on.width.withIcon,
        height: calc.add(tokens.handle$on.height.withIcon, DENSITY),
      },
    },
  }),
  icon: ({ root }) => ({
    position: 'absolute',
    inset: 0,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fill: 'currentColor',
    opacity: 0,
    color: tokens.icon.color.normal,
    fontSize: tokens.icon.size,
    width: tokens.icon.size,
    height: tokens.icon.size,
    transitionProperty: 'fill, opacity, transform',
    transitionDuration: '67ms, 67ms, 167ms',
    transitionTimingFunction: `linear, linear, ${themeTokens.motion.easing.standard.normal}`,

    selectors: {
      [getModifierSelector<IModifier>('on', root)]: {
        fontSize: fallbackVar(tokens.icon$checked.size, tokens.icon.size),
        width: fallbackVar(tokens.icon$checked.size, tokens.icon.size),
        height: fallbackVar(tokens.icon$checked.size, tokens.icon.size),
        color: fallbackVar(
          tokens.icon$checked.color.normal,
          tokens.icon.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('loading', root)]: {
        opacity: 1,
      },
      [getModifierSelector<IModifier>(['on', 'disabled'], root)]: {
        color: themeTokens.colorScheme.outlineVariant,
      },
    },
  }),
  icon$checked: ({ root }) => ({
    selectors: {
      [getModifierSelector<IModifier>('checked', root)]: {
        transform: 'rotate(0)',
        opacity: 1,
      },
      [getModifierSelector<IModifier>('!checked', root)]: {
        transform: 'rotate(-180deg)',
        opacity: 0,
      },
    },
  }),
  icon$unchecked: ({ root }) => ({
    selectors: {
      [getModifierSelector<IModifier>('checked', root)]: {
        transform: 'rotate(180deg)',
        opacity: 0,
      },
      [getModifierSelector<IModifier>('!checked', root)]: {
        transform: 'rotate(0)',
        opacity: 1,
      },
    },
  }),
  progressIndicator: {
    width: tokens.icon.size,
    height: tokens.icon.size,
  },
});

export type ISwitchIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const basicTemplateTheme =
  componentThemeFactory<ISwitchIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
