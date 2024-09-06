import { createTheme } from '@vanilla-extract/css';

import type { IIconButtonVariant } from './IconButton.types';
import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { themeTokens } from '../ThemeProvider';
import { Button } from '../Button';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'toggle' | 'selected';

const [tokensClassName, tokens] = createTheme({
  density: px(getDensity({ min: -3, max: 0 })),
  container: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
    size: px(40),
    shape: px(themeTokens.shape.corner.full),
  },
  selectedContainer: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
  },
  unselectedContainer: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
  },
  icon: {
    color: {
      normal: 'inherit',
      hovered: 'inherit',
      focused: 'inherit',
      pressed: 'inherit',
      disabled: 'inherit',
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    size: px(18),
  },
  toggleIcon: {
    color: {
      normal: 'inherit',
      hovered: 'inherit',
      focused: 'inherit',
      pressed: 'inherit',
    },
  },
  toggleSelectedIcon: {
    color: {
      normal: 'inherit',
      hovered: 'inherit',
      focused: 'inherit',
      pressed: 'inherit',
    },
  },
  stateLayer: {
    color: {
      hovered: 'unset',
      pressed: 'unset',
    },
    opacity: {
      hovered: themeTokens.state.stateLayerOpacity.hovered,
      pressed: themeTokens.state.stateLayerOpacity.pressed,
    },
  },
  toggleStateLayer: {
    color: {
      hovered: 'unset',
      pressed: 'unset',
    },
  },
  toggleSelectedStateLayer: {
    color: {
      hovered: 'unset',
      pressed: 'unset',
    },
  },
  outline: {
    style: 'unset',
    width: px(themeTokens.outline.width.none),
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
});

const buttonTokens = Button.theme.tokens;

const classNames = createStyles({
  root: {
    width: tokens.container.size,
    flexShrink: 0,

    vars: {
      [buttonTokens.leadingSpace.normal]: '0px',
      [buttonTokens.trailingSpace.normal]: '0px',
      [buttonTokens.leadingSpace.withLeadingIcon]: '0px',
      [buttonTokens.leadingSpace.withTrailingIcon]: '0px',
      [buttonTokens.trailingSpace.withLeadingIcon]: '0px',
      [buttonTokens.trailingSpace.withTrailingIcon]: '0px',
      [buttonTokens.container.elevation.normal]: elevationLevelPreset[0],
      [buttonTokens.container.minWidth]: tokens.container.size,
      [buttonTokens.container.height]: tokens.container.size,
      [buttonTokens.container.shape]: tokens.container.shape,
      [buttonTokens.container.opacity.disabled]:
        tokens.container.opacity.disabled,
      [buttonTokens.container.color.normal]: tokens.container.color.normal,
      [buttonTokens.container.color.disabled]: tokens.container.color.disabled,
      [buttonTokens.icon.size]: tokens.icon.size,
      [buttonTokens.label.typography.lineHeight]: tokens.icon.size,
      [buttonTokens.icon.color.disabled]: tokens.icon.color.disabled,
      [buttonTokens.icon.opacity.disabled]: tokens.icon.opacity.disabled,
      [buttonTokens.stateLayer.color.hovered]: tokens.stateLayer.color.hovered,
      [buttonTokens.stateLayer.color.pressed]: tokens.stateLayer.color.pressed,
      [buttonTokens.stateLayer.opacity.hovered]:
        tokens.stateLayer.opacity.hovered,
      [buttonTokens.stateLayer.opacity.pressed]:
        tokens.stateLayer.opacity.pressed,
      [buttonTokens.icon.color.normal]: tokens.icon.color.normal,
      [buttonTokens.icon.color.hovered]: tokens.icon.color.hovered,
      [buttonTokens.icon.color.focused]: tokens.icon.color.focused,
      [buttonTokens.icon.color.pressed]: tokens.icon.color.pressed,
      [buttonTokens.outline.style]: tokens.outline.style,
      [buttonTokens.outline.width]: tokens.outline.width,
      [buttonTokens.outline.color.normal]: tokens.outline.color.normal,
      [buttonTokens.outline.color.disabled]: tokens.outline.color.disabled,
      [buttonTokens.outline.opacity.disabled]: tokens.outline.opacity.disabled,
      [buttonTokens.outline.color.focused]: tokens.outline.color.focused,
      [buttonTokens.outline.color.pressed]: tokens.outline.color.pressed,
    },

    selectors: {
      [getModifierSelector<IModifier>({ toggle: true })]: {
        vars: {
          [buttonTokens.stateLayer.color.hovered]:
            tokens.toggleStateLayer.color.hovered,
          [buttonTokens.stateLayer.color.pressed]:
            tokens.toggleStateLayer.color.pressed,
          [buttonTokens.container.color.normal]:
            tokens.unselectedContainer.color.normal,
          [buttonTokens.container.color.disabled]:
            tokens.unselectedContainer.color.disabled,
          [buttonTokens.icon.color.normal]: tokens.toggleIcon.color.normal,
          [buttonTokens.icon.color.hovered]: tokens.toggleIcon.color.hovered,
          [buttonTokens.icon.color.focused]: tokens.toggleIcon.color.focused,
          [buttonTokens.icon.color.pressed]: tokens.toggleIcon.color.pressed,
        },
      },
      [getModifierSelector<IModifier>({ toggle: true, selected: true })]: {
        vars: {
          [buttonTokens.stateLayer.color.hovered]:
            tokens.toggleSelectedStateLayer.color.hovered,
          [buttonTokens.stateLayer.color.pressed]:
            tokens.toggleSelectedStateLayer.color.pressed,
          [buttonTokens.container.color.normal]:
            tokens.selectedContainer.color.normal,
          [buttonTokens.container.color.disabled]:
            tokens.selectedContainer.color.disabled,
          [buttonTokens.icon.color.normal]:
            tokens.toggleSelectedIcon.color.normal,
          [buttonTokens.icon.color.hovered]:
            tokens.toggleSelectedIcon.color.hovered,
          [buttonTokens.icon.color.focused]:
            tokens.toggleSelectedIcon.color.focused,
          [buttonTokens.icon.color.pressed]:
            tokens.toggleSelectedIcon.color.pressed,
        },
      },
    },
  },
});

export type IIconButtonThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  variant: IIconButtonVariant;
  modifier: IModifier;
}>;

export const iconButtonTheme = componentThemeFactory<IIconButtonThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const iconButtonThemeVariants = {
  standard: createStyles({
    root: {
      vars: {
        [tokens.icon.color.normal]: themeTokens.colorScheme.onSurfaceVariant,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.toggleIcon.color.normal]:
          themeTokens.colorScheme.onSurfaceVariant,
        [tokens.toggleSelectedIcon.color.normal]:
          themeTokens.colorScheme.primary,
        [tokens.toggleSelectedStateLayer.color.hovered]:
          themeTokens.colorScheme.onSurfaceVariant,
        [tokens.toggleSelectedStateLayer.color.pressed]:
          themeTokens.colorScheme.onSurfaceVariant,
      },
    },
  }),
  filled: createStyles({
    root: {
      vars: {
        [tokens.container.color.normal]: themeTokens.colorScheme.primary,
        [tokens.container.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.unselectedContainer.color.normal]:
          themeTokens.colorScheme.surfaceContainerHighest,
        [tokens.selectedContainer.color.normal]:
          themeTokens.colorScheme.primary,
        [tokens.icon.color.normal]: themeTokens.colorScheme.onPrimary,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.toggleIcon.color.normal]: themeTokens.colorScheme.primary,
        [tokens.toggleSelectedIcon.color.normal]:
          themeTokens.colorScheme.onPrimary,
      },
    },
  }),
  filledTonal: createStyles({
    root: {
      vars: {
        [tokens.container.color.normal]:
          themeTokens.colorScheme.secondaryContainer,
        [tokens.container.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.unselectedContainer.color.normal]:
          themeTokens.colorScheme.surfaceContainerHighest,
        [tokens.selectedContainer.color.normal]:
          themeTokens.colorScheme.secondaryContainer,
        [tokens.icon.color.normal]:
          themeTokens.colorScheme.onSecondaryContainer,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.toggleIcon.color.normal]:
          themeTokens.colorScheme.onSurfaceVariant,
        [tokens.toggleSelectedIcon.color.normal]:
          themeTokens.colorScheme.onSecondaryContainer,
      },
    },
  }),
  outlined: createStyles({
    root: {
      vars: {
        [tokens.selectedContainer.color.normal]:
          themeTokens.colorScheme.inverseSurface,
        [tokens.selectedContainer.color.disabled]: 'transparent',
        [tokens.icon.color.normal]: themeTokens.colorScheme.onSurfaceVariant,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.toggleIcon.color.normal]:
          themeTokens.colorScheme.onSurfaceVariant,
        [tokens.toggleSelectedIcon.color.normal]:
          themeTokens.colorScheme.inverseOnSurface,
        [tokens.outline.style]: 'solid',
      },
    },
  }),
  danger: createStyles({
    root: {
      vars: {
        [tokens.container.color.normal]: themeTokens.colorScheme.errorContainer,
        [tokens.container.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.unselectedContainer.color.normal]:
          themeTokens.colorScheme.surfaceContainerHighest,
        [tokens.unselectedContainer.color.disabled]:
          themeTokens.colorScheme.onSurface,
        [tokens.selectedContainer.color.normal]:
          themeTokens.colorScheme.errorContainer,
        [tokens.selectedContainer.color.disabled]:
          themeTokens.colorScheme.onSurface,
        [tokens.icon.color.normal]: themeTokens.colorScheme.onErrorContainer,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.toggleIcon.color.normal]:
          themeTokens.colorScheme.onErrorContainer,
        [tokens.toggleSelectedIcon.color.normal]:
          themeTokens.colorScheme.onErrorContainer,
      },
    },
  }),
  snackbar: createStyles({
    root: {
      vars: {
        [tokens.container.size]: px(32),
        [tokens.icon.color.normal]: themeTokens.colorScheme.inverseOnSurface,
        [tokens.icon.color.disabled]: themeTokens.colorScheme.onSurface,
        [tokens.toggleIcon.color.normal]:
          themeTokens.colorScheme.inverseOnSurface,
        [tokens.toggleSelectedIcon.color.normal]:
          themeTokens.colorScheme.inverseOnSurface,
      },
    },
  }),
};
