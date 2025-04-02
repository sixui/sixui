import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Item } from '~/components/Item';
import { ListItem } from '~/components/List/ListItem';
import { ListItemButton } from '~/components/List/ListItemButton';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './NavigationDrawerDestination.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  label: {
    typography: themeTokens.typeScale.label.lg,
  },
  badgeLabel: {
    typography: themeTokens.typeScale.label.lg,
  },
});

const classNames = createStyles({
  root: {
    vars: overrideTokens(ListItemButton.theme.tokens, {
      container: {
        shape: px(themeTokens.shape.corner.full),
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
      nonText: {
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
            normal: themeTokens.colorScheme.onSurface,
            selected: themeTokens.colorScheme.onSecondaryContainer,
          },
          pressed: {
            normal: themeTokens.colorScheme.onSurface,
            selected: themeTokens.colorScheme.onSecondaryContainer,
          },
        },
      },
    }),
  },
  listItem: {
    vars: {
      ...overrideTokens(ListItemButton.theme.tokens, {
        container: {
          color: {
            selected: themeTokens.colorScheme.secondaryContainer,
          },
        },
      }),
      ...overrideTokens(ListItem.theme.tokens, {
        container: {
          leadingSpace: {
            normal: px(space('$xl')),
            withStart: px(space('$lg')),
          },
          trailingSpace: {
            normal: px(space('$xl')),
            withEnd: px(space('$lg')),
          },
        },
        leadingIcon: {
          size: px(24),
        },
        leadingImage: {
          shape: px(themeTokens.shape.corner.circle),
        },
        leadingVideo: {
          shape: px(themeTokens.shape.corner.circle),
        },
      }),
      ...overrideTokens(Item.theme.tokens, {
        label: {
          typography: tokens.label.typography,
        },
        trailingSupportingText: {
          typography: tokens.badgeLabel.typography,
        },
      }),
    },
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
