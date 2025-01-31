import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Item } from '~/components/Item';
import { ListItem } from '~/components/List/ListItem';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
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
    vars: overrideTokens(ListItem.theme.tokens, {
      container: {
        leadingSpace: {
          normal: px(space(6)),
          withStart: px(space(4)),
        },
        trailingSpace: {
          normal: px(space(6)),
          withEnd: px(space(4)),
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
    vars: overrideTokens(Item.theme.tokens, {
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
