import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { CircularProgressIndicator } from '~/components/CircularProgressIndicator';
import { PaperBase } from '~/components/PaperBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './SwitchIndicator.constants';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'on'
  | 'checked'
  | 'with-icon'
  | 'loading'
  | 'with-error';

const DENSITY = px(density({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    width: px(52),
    height: px(32),
  },
  container$off: {
    color: {
      normal: themeTokens.colorScheme.surfaceContainerHighest,
      disabled: themeTokens.colorScheme.surfaceContainerHighest,
      error: themeTokens.colorScheme.surfaceContainerHighest,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  container$on: {
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
      error: themeTokens.colorScheme.error,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  outline$off: {
    color: {
      normal: themeTokens.colorScheme.outlineVariant,
      disabled: themeTokens.colorScheme.onSurface,
      error: themeTokens.colorScheme.error,
    },
    width: {
      normal: px(themeTokens.outline.width.sm),
      disabled: px(themeTokens.outline.width.none),
      error: px(themeTokens.outline.width.sm),
    },
    opacity: {
      disabled: themeTokens.state.outlineOpacity.disabled,
    },
  },
  outline$on: {
    color: {
      normal: themeTokens.colorScheme.outlineVariant,
      disabled: themeTokens.colorScheme.onSurface,
      error: themeTokens.colorScheme.error,
    },
    width: {
      normal: px(themeTokens.outline.width.none),
      disabled: px(themeTokens.outline.width.none),
      error: px(themeTokens.outline.width.none),
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
      error: themeTokens.colorScheme.outline,
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
      error: themeTokens.colorScheme.onError,
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
      disabled: themeTokens.colorScheme.outlineVariant,
      error: themeTokens.colorScheme.error,
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
    width: tokens.container.width,
    height: calc.add(tokens.container.height, DENSITY),

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        shape: px(themeTokens.shape.corner.full),
        color: tokens.container$off.color.normal,
      },
      outline: {
        width: tokens.outline$off.width.normal,
        color: tokens.outline$off.color.normal,
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('with-error')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container$off.color.error,
          },
          outline: {
            color: fallbackVar(
              tokens.outline$off.color.error,
              tokens.outline$off.color.normal,
            ),
            width: fallbackVar(
              tokens.outline$off.width.error,
              tokens.outline$off.width.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>('disabled')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container$off.color.disabled,
            opacity: tokens.container$off.opacity.disabled,
          },
          outline: {
            color: tokens.outline$off.color.disabled,
            width: tokens.outline$off.width.disabled,
          },
        }),
      },
      [modifierSelector<IModifier>('on')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container$on.color.normal,
          },
          outline: {
            color: tokens.outline$on.color.normal,
            width: tokens.outline$on.width.normal,
          },
        }),
      },
      [modifierSelector<IModifier>(['on', 'with-error'])]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container$on.color.error,
          },
          outline: {
            color: fallbackVar(
              tokens.outline$on.color.error,
              tokens.outline$on.color.normal,
            ),
            width: fallbackVar(
              tokens.outline$on.width.error,
              tokens.outline$on.width.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>(['on', 'disabled'])]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container$on.color.disabled,
            opacity: tokens.container$on.opacity.disabled,
          },
          outline: {
            color: tokens.outline$on.color.disabled,
            width: tokens.outline$on.width.disabled,
            opacity: tokens.outline$on.opacity.disabled,
          },
        }),
      },
      [modifierSelector<IModifier>('hovered')]: {
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
    transitionDuration: themeTokens.motion.duration.medium2,

    marginInlineEnd: `calc(${tokens.container.width} - ${tokens.container.height})`,
    marginInlineStart: 0,

    selectors: {
      [modifierSelector<IModifier>('checked', root)]: {
        marginInlineStart: `calc(${tokens.container.width} - ${tokens.container.height})`,
        marginInlineEnd: 0,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        transitionProperty: 'none',
      },
    },
  }),
  handle: ({ root }) => ({
    position: 'relative',
    transformOrigin: 'center',
    transitionProperty: 'width, height',
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    transitionDuration: themeTokens.motion.duration.medium2,
    width: calc.add(tokens.handle$off.width.normal, DENSITY),
    height: calc.add(tokens.handle$off.height.normal, DENSITY),

    vars: {
      ...overrideTokens(PaperBase.theme.tokens, {
        container: {
          color: tokens.handle$off.color.normal,
          shape: px(themeTokens.shape.corner.full),
        },
      }),
    },
    selectors: {
      [modifierSelector<IModifier>(['!on', 'with-error'], root)]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$off.color.error,
              tokens.handle$off.color.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>(['on', 'with-error'], root)]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$on.color.error,
              tokens.handle$on.color.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>(
        {
          on: false,
          focused: true,
        },
        root,
      )]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$off.color.focused,
              tokens.handle$off.color.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>(
        {
          on: false,
          hovered: true,
        },
        root,
      )]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$off.color.hovered,
              tokens.handle$off.color.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>(
        {
          on: false,
          pressed: true,
        },
        root,
      )]: {
        width: calc.add(tokens.handle$off.width.pressed, DENSITY),
        height: calc.add(tokens.handle$off.height.pressed, DENSITY),
        transitionTimingFunction: themeTokens.motion.easing.standard.normal,
        transitionDuration: themeTokens.motion.duration.short3,

        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$off.color.pressed,
              tokens.handle$off.color.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>(
        {
          on: false,
          disabled: true,
        },
        root,
      )]: {
        cursor: 'default',

        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.handle$off.color.disabled,
            opacity: tokens.handle$off.opacity.disabled,
          },
        }),
      },
      [modifierSelector<IModifier>(
        {
          on: false,
          pressed: false,
          'with-icon': true,
        },
        root,
      )]: {
        width: calc.add(tokens.handle$off.width.withIcon, DENSITY),
        height: calc.add(tokens.handle$off.height.withIcon, DENSITY),
      },
      [modifierSelector<IModifier>({ on: true }, root)]: {
        width: calc.add(tokens.handle$on.width.normal, DENSITY),
        height: calc.add(tokens.handle$on.height.normal, DENSITY),
      },
      [modifierSelector<IModifier>({ on: true, 'with-error': false }, root)]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.handle$on.color.normal,
          },
        }),
      },
      [modifierSelector<IModifier>(
        {
          on: true,
          'with-error': false,
          focused: true,
        },
        root,
      )]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$on.color.focused,
              tokens.handle$on.color.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>(
        {
          on: true,
          'with-error': false,
          hovered: true,
        },
        root,
      )]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$on.color.hovered,
              tokens.handle$on.color.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>(
        {
          on: true,
          'with-error': false,
          pressed: true,
        },
        root,
      )]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.handle$on.color.pressed,
              tokens.handle$on.color.normal,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>(
        {
          on: true,
          pressed: true,
        },
        root,
      )]: {
        width: calc.add(tokens.handle$on.width.pressed, DENSITY),
        height: calc.add(tokens.handle$on.height.pressed, DENSITY),
        transitionTimingFunction: themeTokens.motion.easing.standard.normal,
        transitionDuration: themeTokens.motion.duration.short3,
      },
      [modifierSelector<IModifier>(
        {
          on: true,
          disabled: true,
        },
        root,
      )]: {
        cursor: 'default',

        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.handle$on.color.disabled,
            opacity: tokens.handle$on.opacity.disabled,
          },
        }),
      },
      [modifierSelector<IModifier>(
        {
          on: true,
          pressed: false,
          'with-icon': true,
        },
        root,
      )]: {
        width: calc.add(tokens.handle$on.width.withIcon, DENSITY),
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
      [modifierSelector<IModifier>('on', root)]: {
        fontSize: fallbackVar(tokens.icon$checked.size, tokens.icon.size),
        width: fallbackVar(tokens.icon$checked.size, tokens.icon.size),
        height: fallbackVar(tokens.icon$checked.size, tokens.icon.size),
        color: fallbackVar(
          tokens.icon$checked.color.normal,
          tokens.icon.color.normal,
        ),
      },
      [modifierSelector<IModifier>('loading', root)]: {
        opacity: 1,
      },
      [modifierSelector<IModifier>(['on', 'disabled'], root)]: {
        color: tokens.icon$checked.color.disabled,
      },
      [modifierSelector<IModifier>(['on', '!disabled', 'with-error'], root)]: {
        color: tokens.icon$checked.color.error,
      },
    },
  }),
  icon$checked: ({ root }) => ({
    selectors: {
      [modifierSelector<IModifier>('checked', root)]: {
        transform: 'rotate(0)',
        opacity: 1,
      },
      [modifierSelector<IModifier>('!checked', root)]: {
        transform: 'rotate(-180deg)',
        opacity: 0,
      },
    },
  }),
  icon$unchecked: ({ root }) => ({
    selectors: {
      [modifierSelector<IModifier>('checked', root)]: {
        transform: 'rotate(180deg)',
        opacity: 0,
      },
      [modifierSelector<IModifier>('!checked', root)]: {
        transform: 'rotate(0)',
        opacity: 1,
      },
    },
  }),
  progressIndicator: {
    width: calc.add(tokens.icon.size, DENSITY),
    height: calc.add(tokens.icon.size, DENSITY),

    vars: overrideTokens(CircularProgressIndicator.theme.tokens, {
      activeIndicator: {
        color: {
          normal: themeTokens.colorScheme.onSurface,
          disabled: themeTokens.colorScheme.onSurface,
        },
      },
    }),
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
