import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { Item } from '~/components/Item';
import { ListItem } from '~/components/List/ListItem';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';
import { createTokensVars } from '~/utils/styles/createTokensVars';

type IModifier = 'disabled' | 'expanded' | 'checkable' | 'switchable';

const [tokensClassName, tokens] = createTheme({
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
    leadingSpace: px(space(4)),
    trailingSpace: px(space(4)),
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
  },
  listItem: ({ root }) => ({
    display: 'block',
    width: '100%',

    vars: createTokensVars(ListItem.theme.tokens, {
      container: {
        shape: tokens.container.shape,
        color: {
          normal: {
            regular: tokens.container.color.normal,
          },
          disabled: tokens.container.color.disabled,
        },
        opacity: {
          disabled: tokens.container.opacity.disabled,
        },
      },
      leadingIcon: {
        color: {
          normal: {
            regular: tokens.icon.color.normal,
          },
          disabled: tokens.icon.color.disabled,
        },
      },
      text: {
        color: {
          normal: {
            regular: tokens.label.color.normal,
          },
          disabled: tokens.label.color.disabled,
        },
        opacity: {
          disabled: tokens.label.opacity.disabled,
        },
      },
    }),
    selectors: {
      [getModifierSelector<IModifier>('expanded', root)]: {
        vars: createTokensVars(ListItem.theme.tokens, {
          container: {
            color: {
              normal: {
                regular: tokens.container.color.expanded,
              },
            },
          },
          leadingIcon: {
            color: {
              normal: {
                regular: tokens.icon.color.expanded,
              },
            },
          },
          text: {
            color: {
              normal: {
                regular: tokens.label.color.expanded,
              },
            },
          },
        }),
      },
      [getModifierSelector<IModifier>('checkable', root)]: {
        vars: createTokensVars(ListItem.theme.tokens, {
          container: {
            leadingSpace: {
              normal: calc(tokens.toggle.leadingSpace)
                // CheckboxIndicator.theme.tokens.container.size
                .add(px(18))
                .add(tokens.toggle.trailingSpace)
                .toString(),
              withStartSlot: calc(tokens.toggle.leadingSpace)
                // CheckboxIndicator.theme.tokens.container.size
                .add(px(16))
                .add(tokens.toggle.trailingSpace)
                .toString(),
            },
          },
        }),
      },
      [getModifierSelector<IModifier>('switchable', root)]: {
        vars: createTokensVars(ListItem.theme.tokens, {
          container: {
            leadingSpace: {
              normal: calc(tokens.toggle.leadingSpace)
                // SwitchIndicator.theme.tokens.container.width
                .add(px(52))
                .add(tokens.toggle.trailingSpace)
                .toString(),
              withStartSlot: calc(tokens.toggle.leadingSpace)
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
  item: {
    vars: createTokensVars(Item.theme.tokens, {
      label: {
        typography: tokens.label.typography,
      },
    }),
  },
  icon: ({ root }) => ({
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short.$2,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
    transformOrigin: 'center',
    transform: 'rotate(0)',

    selectors: {
      [getModifierSelector<IModifier>('expanded', root)]: {
        transform: 'rotate(180deg)',
        transitionDuration: themeTokens.motion.duration.long.$2,
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
