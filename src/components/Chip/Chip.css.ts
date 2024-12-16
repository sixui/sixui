import { createTheme, fallbackVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IChipVariant } from './Chip.types';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Button } from '../Button';
import { PaperBase } from '../PaperBase';
import { StateLayer } from '../StateLayer';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'elevated'
  | 'selected'
  | 'loading'
  | 'interactive'
  | 'avatar';

const DENSITY = px(getDensity({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  container: {
    leadingSpace: {
      normal: px(space(4)),
      withLeadingIcon: px(space(2)),
    },
    trailingSpace: {
      normal: px(space(4)),
      withLeadingIcon: px(space(4)),
    },
    color: {
      normal: themeTokens.colorScheme.surfaceContainerLow,
      disabled: themeTokens.colorScheme.onSurface,
    },
    height: px(32),
    minWidth: px(0),
    shape: {
      topLeft: px(themeTokens.shape.corner.sm),
      topRight: px(themeTokens.shape.corner.sm),
      bottomRight: px(themeTokens.shape.corner.sm),
      bottomLeft: px(themeTokens.shape.corner.sm),
    },
  },
  container$elevated: {
    elevation: {
      normal: elevationLevelPreset[1],
      focused: elevationLevelPreset[1],
      hovered: elevationLevelPreset[2],
      pressed: elevationLevelPreset[1],
      disabled: elevationLevelPreset[0],
    },
  },
  container$selected: {
    //
  },
  outline: {
    style: 'solid',
    width: px(themeTokens.outline.width.xs),
    color: {
      normal: themeTokens.colorScheme.outline,
      disabled: themeTokens.colorScheme.onSurface,
      focused: themeTokens.colorScheme.outline,
      pressed: themeTokens.colorScheme.outline,
    },
    opacity: {
      disabled: themeTokens.state.outlineOpacity.disabled,
    },
  },
  outline$elevated: {
    style: 'unset',
  },
  outline$selected: {
    style: 'unset',
  },
  stateLayer: {
    color: {
      hovered: 'inherit',
      pressed: 'inherit',
    },
    opacity: {
      hovered: themeTokens.state.stateLayerOpacity.hovered,
      pressed: themeTokens.state.stateLayerOpacity.pressed,
    },
  },
  stateLayer$selected: {
    color: {
      hovered: 'inherit',
      pressed: 'inherit',
    },
  },
  label: {
    typography: themeTokens.typeScale.label.lg,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      focused: themeTokens.colorScheme.onSurface,
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  label$selected: {
    color: {
      normal: 'inherit',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: 'inherit',
    },
  },
  icon: {
    leadingSpace: px(space(2)),
    trailingSpace: px(space(2)),
    size: px(18),
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      interactive: themeTokens.colorScheme.primary,
      focused: themeTokens.colorScheme.primary,
      hovered: themeTokens.colorScheme.primary,
      pressed: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.primary,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  icon$selected: {
    color: {
      normal: 'inherit',
      interactive: 'inherit',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: 'inherit',
    },
  },
  trailingIcon: {
    leadingSpace: px(space(2)),
    trailingSpace: px(space(2)),
    size: px(18),
    color: {
      normal: 'inherit',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: 'inherit',
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  trailingIcon$selected: {
    color: {
      normal: 'inherit',
      interactive: 'inherit',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: 'inherit',
    },
  },
  avatar: {
    size: px(24),
    shape: {
      topLeft: px(themeTokens.shape.corner.full),
      topRight: px(themeTokens.shape.corner.full),
      bottomRight: px(themeTokens.shape.corner.full),
      bottomLeft: px(themeTokens.shape.corner.full),
    },
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(Button.theme.tokens, {
      container: tokens.container,
      outline: tokens.outline,
    }),

    transitionProperty: 'border-radius',
    transitionDuration: themeTokens.motion.duration.medium.$4,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,

    selectors: {
      [getModifierSelector<IModifier>({
        elevated: true,
      })]: {
        vars: createTokensVars(Button.theme.tokens, {
          container: tokens.container$elevated,
          outline: tokens.outline$elevated,
        }),
      },
      [getModifierSelector<IModifier>({
        elevated: false,
        selected: true,
      })]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: tokens.container$selected,
          outline: tokens.outline$selected,
        }),
      },
      // [getModifierSelector<IModifier>({
      //   elevated: true,
      //   toggle: true,
      //   selected: true,
      // })]: {
      //   vars: createTokensVars(PaperBase.theme.tokens, {
      //     container: tokens.container$elevated$selected,
      //   }),
      // },
    },
  },
});

export type IChipThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IChipVariant;
}>;

export const chipTheme = componentThemeFactory<IChipThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const chipThemeVariants = {
  // assist: createStyles({
  //   root: {
  //     vars: createTokensVars(tokens, {
  //       container$flat: {
  //         color: {
  //           normal: themeTokens.colorScheme.surfaceContainerLow,
  //         },
  //       },
  //       stateLayer: {
  //         color: {
  //           hovered: themeTokens.colorScheme.onSurface,
  //           pressed: themeTokens.colorScheme.onSurface,
  //         },
  //       },
  //     }),
  //   },
  // }),
  // filter: createStyles({
  //   root: {
  //     vars: createTokensVars(tokens, {
  //       container$flat: {
  //         color: {
  //           normal: themeTokens.colorScheme.surfaceContainerLow,
  //         },
  //       },
  //       container$flat$selected: {
  //         color: {
  //           normal: themeTokens.colorScheme.secondaryContainer,
  //           disabled: themeTokens.colorScheme.onSurface,
  //         },
  //       },
  //       container$elevated$selected: {
  //         color: {
  //           normal: themeTokens.colorScheme.secondaryContainer,
  //         },
  //       },
  //       outline: {
  //         width: px(themeTokens.outline.width.none),
  //       },
  //       label$selected: {
  //         color: {
  //           normal: themeTokens.colorScheme.onSecondaryContainer,
  //         },
  //       },
  //       stateLayer: {
  //         color: {
  //           hovered: themeTokens.colorScheme.onSurfaceVariant,
  //           pressed: themeTokens.colorScheme.onSecondaryContainer,
  //         },
  //       },
  //       stateLayer$selected: {
  //         color: {
  //           hovered: themeTokens.colorScheme.onSecondaryContainer,
  //           pressed: themeTokens.colorScheme.onSurfaceVariant,
  //         },
  //       },
  //       icon$selected: {
  //         color: {
  //           normal: themeTokens.colorScheme.onSecondaryContainer,
  //         },
  //       },
  //       trailingIcon: {
  //         color: {
  //           normal: themeTokens.colorScheme.onSurfaceVariant,
  //           disabled: themeTokens.colorScheme.onSurface,
  //         },
  //       },
  //       trailingIcon$selected: {
  //         color: {
  //           normal: themeTokens.colorScheme.onSecondaryContainer,
  //         },
  //       },
  //     }),
  //   },
  //   iconContainer$leading: {
  //     transitionProperty: 'opacity, width',
  //     transitionDuration: themeTokens.motion.duration.medium.$4,
  //     transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,
  //   },
  //   iconContainer$collapsed: {
  //     transitionProperty: 'opacity, width',
  //     transitionDuration: themeTokens.motion.duration.short.$2,
  //     transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
  //   },
  // }),
};
