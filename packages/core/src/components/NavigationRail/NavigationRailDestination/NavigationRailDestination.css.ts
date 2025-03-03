import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { ButtonBase } from '~/components/ButtonBase';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/Theme';
import { IInteraction } from '~/hooks/useInteractions';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { COMPONENT_NAME } from './NavigationRailDestination.constants';

type IModifier = IInteraction | 'disabled' | 'active' | 'icon-only';

const DENSITY = px(density({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  gap: px(space('$xs')),
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

    vars: {
      ...overrideTokens(ButtonBase.theme.tokens, {
        container: {
          shape: tokens.container.shape.normal,
        },
      }),
      ...overrideTokens(PaperBase.theme.tokens, {
        container: {
          color: 'transparent',
          shape: tokens.container.shape.normal,
        },
      }),
    },

    selectors: {
      [modifierSelector<IModifier>('icon-only')]: {
        vars: overrideTokens(ButtonBase.theme.tokens, {
          container: {
            shape: tokens.container.shape.iconOnly,
          },
        }),
      },
    },
  },
  stateLayer: ({ root }) => ({
    vars: overrideTokens(StateLayer.theme.tokens, {
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
      [modifierSelector<IModifier>('active', root)]: {
        vars: overrideTokens(StateLayer.theme.tokens, {
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
      [modifierSelector<IModifier>('icon-only', root)]: {
        height: tokens.activeIndicator.height.iconOnly,
        borderRadius: tokens.activeIndicator.shape.iconOnly,
      },
      [modifierSelector<IModifier>('active', root)]: {
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
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.icon.color.disabled,
        opacity: tokens.icon.opacity.disabled,
      },
      [modifierSelector<IModifier>('active', root)]: {
        color: tokens.icon.color.inactive.normal,
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.icon.color.inactive.hovered,
          tokens.icon.color.inactive.normal,
        ),
      },
      [modifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.icon.color.inactive.focused,
          tokens.icon.color.inactive.normal,
        ),
      },
      [modifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.icon.color.inactive.pressed,
          tokens.icon.color.inactive.normal,
        ),
      },
      [modifierSelector<IModifier>(['active', 'hovered'], root)]: {
        color: fallbackVar(
          tokens.icon.color.active.hovered,
          tokens.icon.color.active.normal,
        ),
      },
      [modifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.icon.color.active.focused,
          tokens.icon.color.active.normal,
        ),
      },
      [modifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.icon.color.active.pressed,
          tokens.icon.color.active.normal,
        ),
      },
    },
  }),
  label: ({ root }) => ({
    ...typography(tokens.label.typography.normal),
    color: tokens.label.color.inactive.normal,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
      [modifierSelector<IModifier>('active', root)]: {
        ...typography(tokens.label.typography.active),
        color: tokens.label.color.active.normal,
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.label.color.inactive.hovered,
          tokens.label.color.inactive.normal,
        ),
      },
      [modifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.label.color.inactive.focused,
          tokens.label.color.inactive.normal,
        ),
      },
      [modifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.label.color.inactive.pressed,
          tokens.label.color.inactive.normal,
        ),
      },
      [modifierSelector<IModifier>(['active', 'hovered'], root)]: {
        color: fallbackVar(
          tokens.label.color.active.hovered,
          tokens.label.color.active.normal,
        ),
      },
      [modifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.label.color.active.focused,
          tokens.label.color.active.normal,
        ),
      },
      [modifierSelector<IModifier>('pressed', root)]: {
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
