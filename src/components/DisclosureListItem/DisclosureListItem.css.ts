import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Item } from '../Item';
import { ListItem } from '../ListItem';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'disabled' | 'expanded';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
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
});

const classNames = createStyles({
  root: {
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
      [getModifierSelector<IModifier>('expanded')]: {
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
    },
  },
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
});

export type IDisclosureListItemThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const disclosureListItemTheme =
  componentThemeFactory<IDisclosureListItemThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
