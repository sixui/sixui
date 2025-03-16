import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Checkmark } from '~/components/Checkmark';
import { PaperBase } from '~/components/PaperBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './CheckboxIndicator.constants';

type IModifier = 'disabled' | 'on' | 'was-disabled' | 'loading' | 'with-error';

const DENSITY = px(density({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(2),
    size: px(18),
  },
  mark: {
    stroke: '3px',
  },
  container$off: {
    color: {
      normal: 'transparent',
      disabled: 'inherit',
      error: 'transparent',
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  outline$off: {
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      error: themeTokens.colorScheme.error,
    },
    width: px(themeTokens.outline.width.sm),
  },
  container$on: {
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
      error: themeTokens.colorScheme.error,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  icon: {
    size: px(12),
    color: {
      normal: themeTokens.colorScheme.onPrimary,
      disabled: themeTokens.colorScheme.surface,
      error: themeTokens.colorScheme.onError,
    },
    opacity: {
      disabled: '1',
    },
  },
});

const classNames = createStyles({
  root: {
    width: calc.add(tokens.container.size, DENSITY),
    height: calc.add(tokens.container.size, DENSITY),
    display: 'flex',
    placeContent: 'center',
    placeItems: 'center',

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        shape: tokens.container.shape,
        color: tokens.container$off.color.normal,
      },
      outline: {
        color: tokens.outline$off.color.normal,
        width: tokens.outline$off.width,
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('loading')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          outline: {
            width: px(themeTokens.outline.width.none),
          },
        }),
      },
      [modifierSelector<IModifier>(['on', 'disabled'])]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          outline: {
            width: px(themeTokens.outline.width.none),
          },
        }),
      },
      [modifierSelector<IModifier>('disabled')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            opacity: themeTokens.state.opacity.disabled,
          },
          outline: {
            color: tokens.container$on.color.disabled,
            opacity: tokens.container$on.opacity.disabled,
          },
        }),
      },
      [modifierSelector<IModifier>('with-error')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container$off.color.error,
          },
          outline: {
            color: tokens.outline$off.color.error,
          },
        }),
      },
    },
  },
  progressIndicator: {
    width: calc.add(tokens.container.size, DENSITY),
    height: calc.add(tokens.container.size, DENSITY),
  },
  layer: {
    position: 'absolute',
    inset: 0,
  },
  background: ({ root }) => ({
    zIndex: 1,
    borderRadius: 'inherit',
    backgroundColor: 'unset',
    transitionProperty: 'transform, opacity',
    transitionDuration: `${themeTokens.motion.duration.short3}, ${themeTokens.motion.duration.short1}`,
    transitionTimingFunction: `${themeTokens.motion.easing.emphasized.accelerate}, linear`,
    transform: 'scale(0.6)',
    transformOrigin: 'center',

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the
        // checkboxIndicator state is programmatically changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        backgroundColor: tokens.container$off.color.disabled,
        opacity: tokens.container$off.opacity.disabled,
      },
      [modifierSelector<IModifier>('on', root)]: {
        transitionDuration: `${themeTokens.motion.duration.medium3}, ${themeTokens.motion.duration.short1}`,
        transitionTimingFunction: `${themeTokens.motion.easing.emphasized.decelerate}, linear`,
        transform: 'scale(1)',
        opacity: 1,
        backgroundColor: tokens.container$on.color.normal,
      },
      [modifierSelector<IModifier>(['on', 'disabled'], root)]: {
        animationDuration: '0s',
        transitionDuration: '0s',
        // Set disabled opacity only when selected since opacity is used to show
        // or hide the container background.
        backgroundColor: fallbackVar(
          tokens.container$on.color.disabled,
          tokens.container$on.color.normal,
        ),
        opacity: tokens.container$on.opacity.disabled,
      },
      [modifierSelector<IModifier>('was-disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the checkbox state
        // is programmatically changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
      [modifierSelector<IModifier>(['on', 'with-error'], root)]: {
        backgroundColor: tokens.container$on.color.error,
      },
    },
  }),
  icon: ({ root }) => ({
    zIndex: 1,
    position: 'relative',
    // The icon is created with two <rect> marks for animation:
    // 1. Short end
    //   - the smaller leading part of the checkmark
    //   - hidden behind long end for indeterminate mark
    // 2. Long end
    //   - the larger trailing part of the checkmark
    //   - the entirety of the indeterminate mark
    width: tokens.icon.size,
    height: tokens.icon.size,
    fill: tokens.icon.color.normal,
    transitionProperty: 'transform, opacity',
    transitionDuration: `${themeTokens.motion.duration.short3}, ${themeTokens.motion.duration.short1}`,
    transitionTimingFunction: `${themeTokens.motion.easing.emphasized.accelerate}, linear`,
    transform: 'scale(0.6)',
    transformOrigin: 'center',
    opacity: 0,

    vars: overrideTokens(Checkmark.theme.tokens, {
      color: tokens.icon.color.normal,
      stroke: tokens.mark.stroke,
    }),

    selectors: {
      [modifierSelector<IModifier>('on', root)]: {
        transitionDuration: `${themeTokens.motion.duration.medium3}, ${themeTokens.motion.duration.short1}`,
        transitionTimingFunction: `${themeTokens.motion.easing.emphasized.decelerate}, linear`,
        transform: 'scale(1)',
        opacity: 1,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the
        // checkboxIndicator state is programmatically changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',

        fill: fallbackVar(tokens.icon.color.disabled, tokens.icon.color.normal),
        opacity: tokens.icon.opacity.disabled,
      },
      [modifierSelector<IModifier>('was-disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the checkbox state
        // is programmatically changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
    },
  }),
});

export type ICheckboxIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const checkboxIndicatorTheme =
  componentThemeFactory<ICheckboxIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
