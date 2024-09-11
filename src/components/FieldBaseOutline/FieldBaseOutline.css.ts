import { createTheme, createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { space } from '~/helpers/styles/space';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';

type IModifier =
  | IInteraction
  | 'with-label'
  | 'with-error'
  | 'populated'
  | 'disabled';

const [tokensClassName, tokens] = createTheme({
  leadingSpace: px(space(4)),
  trailingSpace: px(space(4)),
  color: {
    normal: {
      regular: themeTokens.colorScheme.outline,
      error: themeTokens.colorScheme.error,
    },
    focused: {
      regular: themeTokens.colorScheme.primary,
      error: themeTokens.colorScheme.error,
    },
    hovered: {
      regular: themeTokens.colorScheme.onSurface,
      error: themeTokens.colorScheme.onErrorContainer,
    },
    disabled: themeTokens.colorScheme.onSurface,
  },
  opacity: {
    disabled: themeTokens.state.outlineOpacity.disabled,
  },
  width: {
    normal: themeTokens.outline.width.xs,
    focused: themeTokens.outline.width.md,
    hovered: themeTokens.outline.width.xs,
    disabled: themeTokens.outline.width.xs,
  },
  label: {
    padding: px(space(1)),
    bottomSpace: px(space(2)),
  },
});

const vars = {
  startSpace: createVar(),
};

const classNames = createStyles({
  root: {
    vars: {
      // Add padding that will grow to compensate for the outline's shape. This
      // is needed to prevent the outline border from clipping with the label
      // and is mirrored in the container padding to align the content and
      // resting label with the adjusted floating label.
      [vars.startSpace]: `max(${tokens.leadingSpace}, ${tokens.label.padding})`,
    },

    borderRadius: 'inherit',
    display: 'flex',
    // Allow events to target elements underneath the outline, such as icons.
    pointerEvents: 'none',
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    borderColor: tokens.color.normal.regular,
    // Needed for Firefox HCM
    color: tokens.color.normal.regular,

    selectors: {
      [getModifierSelector<IModifier>('with-error')]: {
        borderColor: tokens.color.normal.error,
        color: tokens.color.normal.error,
      },
      [getModifierSelector<IModifier>('focused')]: {
        borderColor: tokens.color.focused.regular,
        color: tokens.color.focused.regular,
      },
      [getModifierSelector<IModifier>(['focused', 'with-error'])]: {
        borderColor: tokens.color.focused.error,
        color: tokens.color.focused.error,
      },
      [getModifierSelector<IModifier>('hovered')]: {
        borderColor: tokens.color.hovered.regular,
        color: tokens.color.hovered.regular,
      },
      [getModifierSelector<IModifier>(['hovered', 'with-error'])]: {
        borderColor: tokens.color.hovered.error,
        color: tokens.color.hovered.error,
      },
      [getModifierSelector<IModifier>('disabled')]: {
        borderColor: tokens.color.disabled,
        color: tokens.color.disabled,
      },
    },
  },
  section$startEnd: ({ root }) => ({
    borderWidth: 'inherit',
    borderStyle: 'inherit',
    borderColor: 'inherit',
    borderRadius: 'inherit',
    position: 'relative',

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        opacity: tokens.opacity.disabled,
      },
    },
  }),
  section$start: {
    paddingInlineStart: vars.startSpace,
  },
  section$end: {
    flexGrow: 1,
    marginInlineStart: calc.negate(tokens.label.padding),
  },
  section$panel: {
    borderWidth: 'inherit',
    borderColor: 'inherit',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'none',
    inset: 0,
    position: 'absolute',
  },
  section$panel$inactive: ({ root }) => ({
    borderWidth: tokens.width.normal,

    selectors: {
      [getModifierSelector<IModifier>('hovered', root)]: {
        borderWidth: tokens.width.hovered,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        borderWidth: tokens.width.disabled,
        opacity: tokens.opacity.disabled,
      },
    },
  }),
  section$panel$active: ({ root }) => ({
    transitionProperty: 'opacity',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    borderWidth: tokens.width.focused,
    opacity: 0,

    selectors: {
      [getModifierSelector<IModifier>('focused', root)]: {
        opacity: 1,
      },
    },
  }),
  border: {
    borderWidth: 'inherit',
    borderStyle: 'inherit',
    borderColor: 'inherit',
    inset: 0,
    position: 'absolute',
  },
  border$startEnd: {
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
  },
  border$start: {
    borderInlineStartStyle: 'solid',
    borderInlineEndStyle: 'none',
    borderStartStartRadius: 'inherit',
    borderStartEndRadius: 0,
    borderEndStartRadius: 'inherit',
    borderEndEndRadius: 0,
    marginInlineEnd: tokens.label.padding,
  },
  border$inactive$startEnd: ({ root }) => ({
    borderWidth: tokens.width.normal,

    selectors: {
      [getModifierSelector<IModifier>('hovered', root)]: {
        borderWidth: tokens.width.hovered,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        borderWidth: tokens.width.disabled,
      },
    },
  }),
  border$active$startEnd: ({ root }) => ({
    transitionProperty: 'opacity',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    borderWidth: tokens.width.focused,
    opacity: 0,

    selectors: {
      [getModifierSelector<IModifier>('focused', root)]: {
        opacity: 1,
      },
    },
  }),
  border$active$panel$active: {
    borderWidth: tokens.width.focused,
  },
  border$panel: ({ root }) => ({
    borderTopStyle: 'solid',
    borderBottomStyle: 'unset',
    bottom: 'auto',
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    transform: 'scaleX(1)',

    selectors: {
      [[
        getModifierSelector<IModifier>('focused', root),
        getModifierSelector<IModifier>('populated', root),
      ].join(', ')]: {
        transform: 'scaleX(0)',
      },
    },
  }),
  border$inactive$panel: {
    // Note: no need to do any RTL flipping here. If RTLCSS flips this, it's
    // also ok, we just need one to be left and one to be right.
    right: '50%',
    transformOrigin: 'top left',
  },
  border$inactive$panel$active: {
    borderWidth: tokens.width.focused,
  },
  border$inactive$panel$inactive: ({ root }) => ({
    borderWidth: tokens.width.normal,

    selectors: {
      [getModifierSelector<IModifier>('hovered', root)]: {
        borderWidth: tokens.width.hovered,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        borderWidth: tokens.width.disabled,
      },
      [getModifierSelector<IModifier>('populated', root)]: {
        transform: 'scaleX(0)',
      },
    },
  }),
  border$active$panel: {
    // Note: no need to do any RTL flipping here. If RTLCSS flips this, it's
    // also ok, we just need one to be left and one to be right.
    left: '50%',
    transformOrigin: 'top right',
  },
  border$active$panel$inactive: ({ root }) => ({
    borderWidth: tokens.width.normal,

    selectors: {
      [getModifierSelector<IModifier>('hovered', root)]: {
        borderWidth: tokens.width.hovered,
      },
    },
  }),
  border$end: {
    borderInlineStartStyle: 'none',
    borderInlineEndStyle: 'solid',
    borderStartStartRadius: 0,
    borderStartEndRadius: 'inherit',
    borderEndStartRadius: 0,
    borderEndEndRadius: 'inherit',
  },
  notch: ({ root }) => ({
    alignItems: 'flex-start',
    borderWidth: 'inherit',
    borderStyle: 'inherit',
    borderColor: 'inherit',
    display: 'flex',
    marginInlineStart: calc.negate(tokens.label.padding),
    marginInlineEnd: tokens.label.padding,
    maxWidth: calc.subtract('100%', tokens.leadingSpace, tokens.trailingSpace),
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: tokens.label.padding,
    paddingRight: tokens.label.padding,
    position: 'relative',

    selectors: {
      [getModifierSelector<IModifier>('!with-label', root)]: {
        display: 'none',
      },
    },
  }),
  label: {
    display: 'flex',
    maxWidth: '100%',
    // Center the floating label within the outline stroke
    transform: `translateY(${calc.add('-100%', tokens.label.bottomSpace)})`,
  },
});

export type IFieldBaseOutlineThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const fieldBaseOutlineTheme =
  componentThemeFactory<IFieldBaseOutlineThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
