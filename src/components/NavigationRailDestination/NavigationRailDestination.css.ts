import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

const DENSITY = px(getDensity({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  gap: px(space(1)),
  container: {
    shape: {
      normal: px(themeTokens.shape.corner.lg),
      iconOnly: px(themeTokens.shape.corner.full),
    },
  },
  label: {
    typography: {
      normal: themeTokens.typeScale.label.md,
      active: {
        ...themeTokens.typeScale.label.md,
        weight: themeTokens.typeScale.label.md.weightProminent,
      },
    },
    color: {
      active: {
        normal: themeTokens.colorScheme.onSurface,
        hovered: themeTokens.colorScheme.onSurface,
        focused: themeTokens.colorScheme.onSurface,
        pressed: themeTokens.colorScheme.onSurface,
      },
      inactive: {
        normal: themeTokens.colorScheme.onSurfaceVariant,
        hovered: themeTokens.colorScheme.onSurface,
        focused: themeTokens.colorScheme.onSurface,
        pressed: themeTokens.colorScheme.onSurface,
      },
    },
  },
  icon: {
    size: px(18),
    color: {
      active: {
        normal: themeTokens.colorScheme.onSecondaryContainer,
        hovered: themeTokens.colorScheme.onSecondaryContainer,
        focused: themeTokens.colorScheme.onSecondaryContainer,
        pressed: themeTokens.colorScheme.onSecondaryContainer,
      },
      inactive: {
        normal: themeTokens.colorScheme.onSurfaceVariant,
        hovered: themeTokens.colorScheme.onSurface,
        focused: themeTokens.colorScheme.onSurface,
        pressed: themeTokens.colorScheme.onSurface,
      },
    },
  },
  activeIndicator: {
    color: themeTokens.colorScheme.secondaryContainer,
    width: px(56),
    height: {
      normal: calc.add(px(32), DENSITY),
      iconOnly: calc.add(px(56), DENSITY),
    },
    shape: {
      normal: px(themeTokens.shape.corner.full),
      iconOnly: px(themeTokens.shape.corner.full),
    },
  },
  stateLayer: {
    color: {
      normal: {
        hovered: themeTokens.colorScheme.onSurface,
        pressed: themeTokens.colorScheme.onSurface,
      },
      active: {
        hovered: themeTokens.colorScheme.onSurface,
        pressed: themeTokens.colorScheme.onSurface,
      },
    },
    opacity: {
      normal: {
        hovered: themeTokens.state.stateLayerOpacity.hovered,
        pressed: themeTokens.state.stateLayerOpacity.pressed,
      },
      active: {
        hovered: themeTokens.state.stateLayerOpacity.hovered,
        pressed: themeTokens.state.stateLayerOpacity.pressed,
      },
    },
  },
});

const classNames = createStyles({
  root: {
    //
  },
});

export type INavigationRailDestinationThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const navigationRailDestinationTheme =
  componentThemeFactory<INavigationRailDestinationThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
