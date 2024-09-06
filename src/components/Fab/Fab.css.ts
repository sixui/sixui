import { createTheme } from '@vanilla-extract/css';

import type { IFabVariant } from './Fab.types';
import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { px } from '~/helpers/styles/px';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { space } from '~/helpers/styles/space';
import { themeTokens } from '../ThemeProvider';
import { Button } from '../Button';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'extended' | 'lowered';

const [tokensClassName, tokens] = createTheme({
  container: {
    size: px(56),
    shape: px(themeTokens.shape.corner.lg),
    color: {
      normal: {
        regular: 'unset',
        lowered: 'unset',
      },
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
    elevation: {
      normal: {
        regular: elevationLevelPreset[3],
        lowered: elevationLevelPreset[1],
      },
      hovered: {
        regular: elevationLevelPreset[4],
        lowered: elevationLevelPreset[2],
      },
      focused: {
        regular: elevationLevelPreset[3],
        lowered: elevationLevelPreset[1],
      },
      pressed: {
        regular: elevationLevelPreset[3],
        lowered: elevationLevelPreset[1],
      },
      disabled: elevationLevelPreset[0],
    },
  },
  icon: {
    size: px(24),
    color: {
      normal: themeTokens.colorScheme.onSurface,
      hovered: 'inherit',
      focused: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
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
  label: {
    color: {
      normal: 'inherit',
      hovered: 'inherit',
      focused: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    typography: themeTokens.typeScale.label.lg,
  },
});

const buttonTokens = Button.theme.tokens;

const classNames = createStyles({
  root: {
    zIndex: themeTokens.zIndex.overlay,
    minWidth: 'unset',
    width: tokens.container.size,
    height: tokens.container.size,

    vars: {
      [buttonTokens.leadingSpace.normal]: '0px',
      [buttonTokens.trailingSpace.normal]: '0px',
      [buttonTokens.leadingSpace.withLeadingIcon]: '0px',
      [buttonTokens.leadingSpace.withTrailingIcon]: '0px',
      [buttonTokens.trailingSpace.withLeadingIcon]: '0px',
      [buttonTokens.trailingSpace.withTrailingIcon]: '0px',
      [buttonTokens.gap]: px(space(3)),
      [buttonTokens.container.shape]: tokens.container.shape,
      [buttonTokens.container.elevation.normal]:
        tokens.container.elevation.normal.regular,
      [buttonTokens.container.elevation.focused]:
        tokens.container.elevation.focused.regular,
      [buttonTokens.container.elevation.hovered]:
        tokens.container.elevation.hovered.regular,
      [buttonTokens.container.elevation.pressed]:
        tokens.container.elevation.pressed.regular,
      [buttonTokens.container.elevation.disabled]:
        tokens.container.elevation.disabled,
      [buttonTokens.container.color.normal]:
        tokens.container.color.normal.regular,
      [buttonTokens.container.color.disabled]: tokens.container.color.disabled,
      [buttonTokens.container.opacity.disabled]:
        tokens.container.opacity.disabled,
      [buttonTokens.icon.size]: tokens.icon.size,
      [buttonTokens.icon.color.normal]: tokens.icon.color.normal,
      [buttonTokens.icon.color.disabled]: tokens.icon.color.disabled,
      [buttonTokens.icon.opacity.disabled]: tokens.icon.opacity.disabled,
      [buttonTokens.stateLayer.color.hovered]: tokens.stateLayer.color.hovered,
      [buttonTokens.stateLayer.color.pressed]: tokens.stateLayer.color.pressed,
      [buttonTokens.stateLayer.opacity.hovered]:
        tokens.stateLayer.opacity.hovered,
      [buttonTokens.stateLayer.opacity.pressed]:
        tokens.stateLayer.opacity.pressed,
      [buttonTokens.label.typography.family]: tokens.label.typography.family,
      [buttonTokens.label.typography.lineHeight]:
        tokens.label.typography.lineHeight,
      [buttonTokens.label.typography.size]: tokens.label.typography.size,
      [buttonTokens.label.typography.letterSpacing]:
        tokens.label.typography.letterSpacing,
      [buttonTokens.label.typography.weight]: tokens.label.typography.weight,
      [buttonTokens.label.color.normal]: tokens.label.color.normal,
      [buttonTokens.label.color.focused]: tokens.label.color.focused,
      [buttonTokens.label.color.hovered]: tokens.label.color.hovered,
      [buttonTokens.label.color.pressed]: tokens.label.color.pressed,
      [buttonTokens.label.color.disabled]: tokens.label.color.disabled,
      [buttonTokens.label.opacity.disabled]: tokens.label.opacity.disabled,
    },

    selectors: {
      [getModifierSelector<IModifier>({ extended: true })]: {
        vars: {
          minWidth: tokens.container.size,
          width: 'auto',
          [buttonTokens.leadingSpace.normal]: px(space(6)),
          [buttonTokens.trailingSpace.normal]: px(space(6)),
          [buttonTokens.leadingSpace.withLeadingIcon]: px(space(4)),
          [buttonTokens.trailingSpace.withLeadingIcon]: px(space(6)),
        },
      },
      [getModifierSelector<IModifier>({ lowered: true })]: {
        vars: {
          [buttonTokens.container.elevation.normal]:
            tokens.container.elevation.normal.lowered,
          [buttonTokens.container.elevation.focused]:
            tokens.container.elevation.focused.lowered,
          [buttonTokens.container.elevation.hovered]:
            tokens.container.elevation.hovered.lowered,
          [buttonTokens.container.elevation.pressed]:
            tokens.container.elevation.pressed.lowered,
          [buttonTokens.container.color.normal]:
            tokens.container.color.normal.lowered,
        },
      },
    },
  },
});

export type IFabThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  variant: IFabVariant;
  modifier: IModifier;
}>;

export const fabTheme = componentThemeFactory<IFabThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const fabThemeVariants = {
  surface: createStyles({
    root: {
      vars: {
        // TODO:
      },
    },
  }),
  primary: createStyles({
    root: {
      vars: {
        // TODO:
      },
    },
  }),
  secondary: createStyles({
    root: {
      vars: {
        // TODO:
      },
    },
  }),
  tertiary: createStyles({
    root: {
      vars: {
        // TODO:
      },
    },
  }),
  branded: createStyles({
    root: {
      vars: {
        // TODO:
      },
    },
  }),
};
