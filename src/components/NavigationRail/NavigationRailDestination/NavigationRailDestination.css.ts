import { createTheme, fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { FocusRing } from '~/components/FocusRing';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { cssLayers, themeTokens } from '~/components/ThemeProvider';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { IInteraction } from '~/hooks/useInteractions';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';

type IModifier = IInteraction | 'disabled' | 'active' | 'icon-only';

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
  activeIndicator: {
    color: themeTokens.colorScheme.secondaryContainer,
    width: px(56),
    height: {
      normal: calc.add(px(32), DENSITY),
      iconOnly: calc.add(px(56), DENSITY),
    },
    shape: {
      normal: px(themeTokens.shape.corner.lg),
      iconOnly: px(themeTokens.shape.corner.circle),
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
  icon: {
    size: px(18),
    color: {
      active: {
        normal: themeTokens.colorScheme.onSecondaryContainer,
        hovered: 'inherit',
        focused: 'inherit',
        pressed: 'inherit',
      },
      inactive: {
        normal: themeTokens.colorScheme.onSurfaceVariant,
        hovered: themeTokens.colorScheme.onSurface,
        focused: themeTokens.colorScheme.onSurface,
        pressed: themeTokens.colorScheme.onSurface,
      },
      disabled: themeTokens.colorScheme.onSurfaceVariant,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
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
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: calc.add(tokens.gap, DENSITY),

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: 'transparent',
        shape: tokens.container.shape.normal,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('icon-only')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            shape: tokens.container.shape.iconOnly,
          },
        }),
      },
    },
  },
  stateLayer: ({ root }) => ({
    vars: createTokensVars(StateLayer.theme.tokens, {
      color: {
        hovered: tokens.stateLayer.color.normal.hovered,
        pressed: tokens.stateLayer.color.normal.pressed,
      },
      opacity: {
        hovered: tokens.stateLayer.opacity.normal.hovered,
        pressed: tokens.stateLayer.opacity.normal.pressed,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('active', root)]: {
        vars: createTokensVars(StateLayer.theme.tokens, {
          color: {
            hovered: tokens.stateLayer.color.active.hovered,
            pressed: tokens.stateLayer.color.active.pressed,
          },
          opacity: {
            hovered: tokens.stateLayer.opacity.active.hovered,
            pressed: tokens.stateLayer.opacity.active.pressed,
          },
        }),
      },
    },
  }),
  focusRing: ({ root }) => ({
    vars: createTokensVars(FocusRing.theme.tokens, {
      shape: tokens.container.shape.normal,
    }),

    selectors: {
      [getModifierSelector<IModifier>('icon-only', root)]: {
        vars: createTokensVars(FocusRing.theme.tokens, {
          shape: tokens.container.shape.iconOnly,
        }),
      },
    },
  }),
  activeIndicator: ({ root }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: tokens.activeIndicator.height.normal,
    borderRadius: tokens.activeIndicator.shape.normal,
    backgroundColor: 'unset',
    width: tokens.activeIndicator.width,

    selectors: {
      [getModifierSelector<IModifier>('icon-only', root)]: {
        height: tokens.activeIndicator.height.iconOnly,
        borderRadius: tokens.activeIndicator.shape.iconOnly,
      },
      [getModifierSelector<IModifier>('active', root)]: {
        backgroundColor: tokens.activeIndicator.color,
      },
    },
  }),
  icon: ({ root }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.icon.size,
    inlineSize: tokens.icon.size,
    blockSize: tokens.icon.size,
    color: tokens.icon.color.inactive.normal,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.icon.color.disabled,
        opacity: tokens.icon.opacity.disabled,
      },
      [getModifierSelector<IModifier>('active', root)]: {
        color: tokens.icon.color.inactive.normal,
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.icon.color.inactive.hovered,
          tokens.icon.color.inactive.normal,
        ),
      },
      [getModifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.icon.color.inactive.focused,
          tokens.icon.color.inactive.normal,
        ),
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.icon.color.inactive.pressed,
          tokens.icon.color.inactive.normal,
        ),
      },
      [getModifierSelector<IModifier>(['active', 'hovered'], root)]: {
        color: fallbackVar(
          tokens.icon.color.active.hovered,
          tokens.icon.color.active.normal,
        ),
      },
      [getModifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.icon.color.active.focused,
          tokens.icon.color.active.normal,
        ),
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.icon.color.active.pressed,
          tokens.icon.color.active.normal,
        ),
      },
    },
  }),
  label: ({ root }) => ({
    ...getTypographyStyles(tokens.label.typography.normal),
    color: tokens.label.color.inactive.normal,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
      [getModifierSelector<IModifier>('active', root)]: {
        ...getTypographyStyles(tokens.label.typography.active),
        color: tokens.label.color.active.normal,
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.label.color.inactive.hovered,
          tokens.label.color.inactive.normal,
        ),
      },
      [getModifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.label.color.inactive.focused,
          tokens.label.color.inactive.normal,
        ),
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.label.color.inactive.pressed,
          tokens.label.color.inactive.normal,
        ),
      },
      [getModifierSelector<IModifier>(['active', 'hovered'], root)]: {
        color: fallbackVar(
          tokens.label.color.active.hovered,
          tokens.label.color.active.normal,
        ),
      },
      [getModifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.label.color.active.focused,
          tokens.label.color.active.normal,
        ),
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.label.color.active.pressed,
          tokens.label.color.active.normal,
        ),
      },
    },
  }),
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
