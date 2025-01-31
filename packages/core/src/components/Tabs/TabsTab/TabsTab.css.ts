import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { ITabsTabVariant } from './TabsTab.types';
import { Button } from '~/components/Button';
import { FocusRing } from '~/components/FocusRing';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './TabsTab.constants';

type IModifier =
  | 'disabled'
  | 'with-icon'
  | 'with-label'
  | 'with-inline-badge'
  | 'with-anchored-badge'
  | 'active';

const DENSITY = px(density({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.none),
    height: {
      normal: px(48),
      withIconAndLabel: px(48),
    },
    elevation: {
      normal: elevationLevelPreset[0],
      disabled: elevationLevelPreset[0],
    },
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
    opacity: {
      disabled: 'unset',
    },
  },
  container$active: {
    color: {
      normal: 'inherit',
    },
  },
  stateLayer: {
    color: {
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.primary,
    },
    opacity: {
      hovered: themeTokens.state.stateLayerOpacity.hovered,
      pressed: themeTokens.state.stateLayerOpacity.pressed,
    },
  },
  stateLayer$active: {
    color: {
      hovered: 'inherit',
      pressed: 'inherit',
    },
    opacity: {
      hovered: themeTokens.state.stateLayerOpacity.hovered,
      pressed: themeTokens.state.stateLayerOpacity.pressed,
    },
  },
  icon: {
    size: px(18),
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      focused: themeTokens.colorScheme.onSurface,
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  icon$active: {
    color: {
      normal: 'inherit',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
    },
  },
  label: {
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      focused: themeTokens.colorScheme.onSurface,
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    typography: themeTokens.typeScale.title.sm,
  },
  label$active: {
    color: {
      normal: 'inherit',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
    },
  },
  activeIndicator: {
    shape: 'unset',
    height: px(themeTokens.outline.width.sm),
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    vars: overrideTokens(Button.theme.tokens, {
      container: {
        shape: tokens.container.shape,
        minHeight: calc.add(tokens.container.height.normal, DENSITY),
        elevation: {
          normal: tokens.container.elevation.normal,
          disabled: tokens.container.elevation.disabled,
        },
        color: {
          normal: tokens.container.color.normal,
          disabled: tokens.container.color.disabled,
        },
        opacity: {
          disabled: tokens.container.opacity.disabled,
        },
        leadingSpace: {
          normal: px(space(4)),
          withStart: px(space(4)),
        },
        trailingSpace: {
          normal: px(space(4)),
          withEnd: px(space(4)),
        },
      },
      label: {
        color: {
          normal: tokens.label.color.normal,
          focused: fallbackVar(
            tokens.label.color.focused,
            tokens.label.color.normal,
          ),
          hovered: fallbackVar(
            tokens.label.color.hovered,
            tokens.label.color.normal,
          ),
          pressed: fallbackVar(
            tokens.label.color.pressed,
            tokens.label.color.normal,
          ),
          disabled: tokens.label.color.disabled,
        },
        opacity: {
          disabled: tokens.label.opacity.disabled,
        },
        typography: tokens.label.typography,
      },
      icon: {
        labelSpace: px(0),
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('active')]: {
        vars: overrideTokens(Button.theme.tokens, {
          container: {
            color: {
              normal: fallbackVar(
                tokens.container$active.color.normal,
                tokens.container.color.normal,
              ),
            },
          },
          label: {
            color: {
              normal: fallbackVar(
                tokens.label$active.color.normal,
                tokens.label.color.normal,
              ),
              focused: fallbackVar(
                tokens.label$active.color.focused,
                tokens.label$active.color.normal,
                tokens.label.color.focused,
              ),
              hovered: fallbackVar(
                tokens.label$active.color.hovered,
                tokens.label$active.color.normal,
                tokens.label.color.hovered,
              ),
              pressed: fallbackVar(
                tokens.label$active.color.pressed,
                tokens.label$active.color.normal,
                tokens.label.color.pressed,
              ),
            },
          },
        }),
      },
      [modifierSelector<IModifier>(['with-icon', 'with-label'])]: {
        height: calc.add(tokens.container.height.withIconAndLabel, DENSITY),

        vars: overrideTokens(Button.theme.tokens, {
          container: {
            minHeight: 'unset',
          },
        }),
      },
    },
  },
  stateLayer: ({ root }) => ({
    vars: overrideTokens(StateLayer.theme.tokens, {
      color: {
        hovered: tokens.stateLayer.color.hovered,
        pressed: tokens.stateLayer.color.pressed,
      },
      opacity: {
        hovered: tokens.stateLayer.opacity.hovered,
        pressed: tokens.stateLayer.opacity.pressed,
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('active', root)]: {
        vars: overrideTokens(StateLayer.theme.tokens, {
          color: {
            hovered: fallbackVar(
              tokens.stateLayer$active.color.hovered,
              tokens.stateLayer.color.hovered,
            ),
            pressed: fallbackVar(
              tokens.stateLayer$active.color.pressed,
              tokens.stateLayer.color.pressed,
            ),
          },
          opacity: {
            hovered: fallbackVar(
              tokens.stateLayer$active.opacity.hovered,
              tokens.stateLayer.opacity.hovered,
            ),
            pressed: fallbackVar(
              tokens.stateLayer$active.opacity.pressed,
              tokens.stateLayer.opacity.pressed,
            ),
          },
        }),
      },
    },
  }),
  activeIndicator: ({ root }) => ({
    position: 'absolute',
    transformOrigin: 'left bottom',
    backgroundColor: tokens.activeIndicator.color.normal,
    borderRadius: tokens.activeIndicator.shape,
    height: tokens.activeIndicator.height,
    inset: 'auto 0 0 0',
    // Hidden unless the tab is selected.
    opacity: 0,

    selectors: {
      [modifierSelector<IModifier>('active', root)]: {
        opacity: 1,
      },
      [modifierSelector<IModifier>(['active', 'disabled'], root)]: {
        opacity: tokens.activeIndicator.opacity.disabled,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        backgroundColor: tokens.activeIndicator.color.disabled,
      },
    },
  }),

  label: ({ root }) => ({
    selectors: {
      [modifierSelector<IModifier>('with-inline-badge', root)]: {
        marginRight: px(space(1)),
        verticalAlign: 'middle',
      },
    },
  }),
});

export type ITabsTabThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: ITabsTabVariant;
}>;

export const tabsTabTheme = componentThemeFactory<ITabsTabThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const tabsTabThemeVariants = {
  primary: createStyles({
    root: {
      flexDirection: 'column',
      gap: px(space(1)),

      vars: overrideTokens(tokens, {
        container: {
          height: {
            withIconAndLabel: px(64),
          },
        },
        label$active: {
          color: {
            normal: themeTokens.colorScheme.primary,
          },
        },
        activeIndicator: {
          shape: `${px(3)} ${px(3)} 0 0`,
          height: themeTokens.outline.width.md,
        },
      }),
    },
    activeIndicator: {
      marginLeft: px(space(4)),
      marginRight: px(space(4)),
    },
    focusRing: {
      vars: overrideTokens(FocusRing.theme.tokens, {
        shape: px(themeTokens.shape.corner.sm),
        offset: {
          inward: `0 0 ${px(calc.add(themeTokens.outline.width.md, '1px'))} 0`,
        },
      }),
    },
  }),
  secondary: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        icon$active: {
          color: {
            normal: themeTokens.colorScheme.onSurface,
          },
        },
        label$active: {
          color: {
            normal: themeTokens.colorScheme.onSurface,
          },
        },
      }),

      selectors: {
        [modifierSelector<IModifier>(['with-icon', 'with-label'])]: {
          vars: overrideTokens(Button.theme.tokens, {
            icon: {
              labelSpace: px(space(2)),
            },
          }),
        },
      },
    },
    focusRing: {
      vars: overrideTokens(FocusRing.theme.tokens, {
        shape: px(themeTokens.shape.corner.sm),
        offset: {
          inward: `0 0 ${px(calc.add(themeTokens.outline.width.sm, '1px'))} 0`,
        },
      }),
    },
  }),
};
