import { createTheme, fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { IInteraction } from '~/hooks/useInteractions';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'on'
  | 'checked'
  | 'with-icon'
  | 'loading';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  width: px(52),
  height: px(32),
  handle: {
    width: {
      normal: px(16),
      pressed: px(28),
      on: px(24),
      withIcon: px(24),
    },
    height: {
      normal: px(16),
      pressed: px(28),
      on: px(24),
      withIcon: px(24),
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
    cursor: 'pointer',
    width: tokens.width,
    height: calc.add(tokens.height, DENSITY),

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: {
          normal: themeTokens.colorScheme.surfaceContainerHighest,
          disabled: themeTokens.colorScheme.surfaceContainerHighest,
        },
        shape: px(themeTokens.shape.corner.full),
      },
      outline: {
        width: {
          normal: px(themeTokens.outline.width.sm),
        },
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        cursor: 'default',
        pointerEvents: 'none',
      },
      [getModifierSelector<IModifier>('on')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.primary,
              disabled: themeTokens.colorScheme.onSurface,
            },
          },
          outline: {
            width: {
              normal: px(themeTokens.outline.width.none),
            },
          },
        }),
      },
    },
  },
  stateLayer: {
    borderRadius: themeTokens.shape.corner.full,
    width: themeTokens.density.minTargetSize,
    height: themeTokens.density.minTargetSize,
    inset: 'unset',
  },
  focusRing: {},
  // Input is also touch target
  input: {
    appearance: 'none',
    width: px(themeTokens.density.minTargetSize),
    height: px(themeTokens.density.minTargetSize),
    outline: 'none',
    margin: 0,
    position: 'absolute',
    zIndex: '1',
    cursor: 'inherit',
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
    transformOrigin: 'center',
    transitionProperty: 'width, height',
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    transitionDuration: themeTokens.motion.duration.medium.$2,
    width: tokens.handle.width.normal,
    height: calc.add(tokens.handle.height.normal, DENSITY),

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        shape: px(themeTokens.shape.corner.full),
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
    }),

    selectors: {
      [getModifierSelector<IModifier>('pressed', root)]: {
        width: tokens.handle.width.pressed,
        height: calc.add(tokens.handle.height.pressed, DENSITY),
        transitionTimingFunction: themeTokens.motion.easing.standard.normal,
        transitionDuration: themeTokens.motion.duration.short.$3,
      },
      [getModifierSelector<IModifier>(['!pressed', 'with-icon'], root)]: {
        width: tokens.handle.width.withIcon,
        height: calc.add(tokens.handle.height.withIcon, DENSITY),
      },
      [getModifierSelector<IModifier>(['pressed', 'on'], root)]: {
        width: tokens.handle.width.pressed,
        height: calc.add(tokens.handle.height.pressed, DENSITY),
      },
      [getModifierSelector<IModifier>(['!pressed', 'on'], root)]: {
        width: tokens.handle.width.on,
        height: calc.add(tokens.handle.height.on, DENSITY),
      },
      [getModifierSelector<IModifier>('on', root)]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
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
        }),
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
});

export type ISwitchThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const basicTemplateTheme = componentThemeFactory<ISwitchThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
