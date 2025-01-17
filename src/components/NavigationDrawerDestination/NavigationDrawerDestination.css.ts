import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Item } from '../Item';
import { ListItem } from '../ListItem';
import { cssLayers, themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  label: {
    typography: themeTokens.typeScale.label.lg,
  },
  badgeLabel: {
    typography: themeTokens.typeScale.label.lg,
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(ListItem.theme.tokens, {
      container: {
        leadingSpace: {
          normal: px(space(6)),
          withStartSlot: px(space(4)),
        },
        trailingSpace: {
          normal: px(space(6)),
          withEndSlot: px(space(4)),
        },
        shape: px(themeTokens.shape.corner.full),
        color: {
          normal: {
            selected: themeTokens.colorScheme.secondaryContainer,
          },
        },
      },
      text: {
        color: {
          normal: {
            regular: themeTokens.colorScheme.onSurfaceVariant,
            selected: themeTokens.colorScheme.onSecondaryContainer,
          },
          hovered: {
            regular: themeTokens.colorScheme.onSurface,
          },
          focused: {
            regular: themeTokens.colorScheme.onSurface,
          },
          pressed: {
            regular: themeTokens.colorScheme.onSurface,
          },
        },
      },
      leadingIcon: {
        size: px(24),
        color: {
          normal: {
            regular: themeTokens.colorScheme.onSurfaceVariant,
            selected: themeTokens.colorScheme.onSecondaryContainer,
          },
          hovered: {
            regular: themeTokens.colorScheme.onSurface,
          },
          focused: {
            regular: themeTokens.colorScheme.onSurface,
          },
          pressed: {
            regular: themeTokens.colorScheme.onSurface,
          },
        },
      },
      stateLayer: {
        color: {
          hovered: {
            regular: themeTokens.colorScheme.onSurface,
            selected: themeTokens.colorScheme.onSecondaryContainer,
          },
          pressed: {
            regular: themeTokens.colorScheme.onSurface,
            selected: themeTokens.colorScheme.onSecondaryContainer,
          },
        },
      },
      leadingImage: {
        shape: px(themeTokens.shape.corner.circle),
      },
      leadingVideo: {
        shape: px(themeTokens.shape.corner.circle),
      },
    }),
  },
  item: {
    vars: createTokensVars(Item.theme.tokens, {
      label: {
        typography: tokens.label.typography,
      },
      trailingSupportingText: {
        typography: tokens.badgeLabel.typography,
      },
    }),
  },
});

export type INavigationDrawerDestinationThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const navigationDrawerDestinationTheme =
  componentThemeFactory<INavigationDrawerDestinationThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
