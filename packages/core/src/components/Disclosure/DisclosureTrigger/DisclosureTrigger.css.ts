import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { ButtonBase } from '~/components/ButtonBase';
import { Item } from '~/components/Item';
import { ListItem } from '~/components/List/ListItem';
import { PaperBase } from '~/components/PaperBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './DisclosureTrigger.constants';

type IModifier = 'disabled' | 'expanded' | 'checkable' | 'switchable';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.sm),
    color: {
      normal: themeTokens.colorScheme.secondaryContainer,
      expanded: themeTokens.colorScheme.secondaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  label: {
    typography: themeTokens.typeScale.title.md,
    color: {
      normal: themeTokens.colorScheme.onSecondaryContainer,
      expanded: themeTokens.colorScheme.onSecondaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  icon: {
    color: {
      normal: themeTokens.colorScheme.onSecondaryContainer,
      expanded: themeTokens.colorScheme.onSecondaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  toggle: {
    leadingSpace: px(space('$lg')),
    trailingSpace: px(space('$lg')),
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
  },
  listItemButton: ({ root }) => ({
    display: 'block',
    width: '100%',

    vars: {
      ...overrideTokens(PaperBase.theme.tokens, {
        container: {
          color: tokens.container.color.normal,
        },
      }),
      ...overrideTokens(ButtonBase.theme.tokens, {
        container: {
          shape: tokens.container.shape,
        },
      }),
    },

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.disabled,
            opacity: tokens.container.opacity.disabled,
          },
        }),
      },
      [modifierSelector<IModifier>('expanded', root)]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.expanded,
          },
        }),
      },
    },
  }),
  listItem: ({ root }) => ({
    vars: {
      ...overrideTokens(ListItem.theme.tokens, {
        container: {
          shape: tokens.container.shape,
        },
        leadingIcon: {
          color: {
            normal: tokens.icon.color.normal,
            disabled: tokens.icon.color.disabled,
          },
        },
        text: {
          color: {
            normal: tokens.label.color.normal,
            disabled: tokens.label.color.disabled,
          },
          opacity: {
            disabled: tokens.label.opacity.disabled,
          },
        },
      }),
      ...overrideTokens(Item.theme.tokens, {
        label: {
          typography: tokens.label.typography,
        },
      }),
    },
    selectors: {
      [modifierSelector<IModifier>('expanded', root)]: {
        vars: overrideTokens(ListItem.theme.tokens, {
          leadingIcon: {
            color: {
              normal: tokens.icon.color.expanded,
            },
          },
          text: {
            color: {
              normal: tokens.label.color.expanded,
            },
          },
        }),
      },
      [modifierSelector<IModifier>('checkable', root)]: {
        vars: overrideTokens(ListItem.theme.tokens, {
          container: {
            leadingSpace: {
              normal: calc(tokens.toggle.leadingSpace)
                // CheckboxIndicator.theme.tokens.container.size
                .add(px(18))
                .add(tokens.toggle.trailingSpace)
                .toString(),
              withStart: calc(tokens.toggle.leadingSpace)
                // CheckboxIndicator.theme.tokens.container.size
                .add(px(16))
                .add(tokens.toggle.trailingSpace)
                .toString(),
            },
          },
        }),
      },
      [modifierSelector<IModifier>('switchable', root)]: {
        vars: overrideTokens(ListItem.theme.tokens, {
          container: {
            leadingSpace: {
              normal: calc(tokens.toggle.leadingSpace)
                // SwitchIndicator.theme.tokens.container.width
                .add(px(52))
                .add(tokens.toggle.trailingSpace)
                .toString(),
              withStart: calc(tokens.toggle.leadingSpace)
                // SwitchIndicator.theme.tokens.container.width
                .add(px(50))
                .add(tokens.toggle.trailingSpace)
                .toString(),
            },
          },
        }),
      },
    },
  }),
  icon: ({ root }) => ({
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short2,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
    transformOrigin: 'center',
    transform: 'rotate(0)',

    selectors: {
      [modifierSelector<IModifier>('expanded', root)]: {
        transform: 'rotate(180deg)',
        transitionDuration: themeTokens.motion.duration.long2,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
    },
  }),
  toggleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    marginLeft: tokens.toggle.leadingSpace,
  },
});

export type IDisclosureTriggerThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const disclosureTriggerTheme =
  componentThemeFactory<IDisclosureTriggerThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
