import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Button } from '../Button';
import { cssLayers, themeTokens } from '../ThemeProvider';

const DENSITY = px(getDensity({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  item: {
    color: themeTokens.colorScheme.onSurface,
  },
  separator: {
    color: themeTokens.colorScheme.onSurface,
    size: themeTokens.typeScale.body.md.size,
  },
  expandButton: {
    container: {
      shape: px(2),
      color: themeTokens.colorScheme.surfaceContainer,
      width: px(24),
      height: calc.add(px(16), DENSITY),
      leadingSpace: px(1),
      trailingSpace: px(1),
    },
    icon: {
      size: px(18),
    },
    label: {
      color: themeTokens.colorScheme.onSurface,
    },
  },
});

const classNames = createStyles({
  root: {
    minWidth: 'unset',
    width: tokens.expandButton.container.width,

    vars: createTokensVars(Button.theme.tokens, {
      container: {
        shape: tokens.expandButton.container.shape,
        color: {
          normal: tokens.expandButton.container.color,
        },
        height: tokens.expandButton.container.height,
        leadingSpace: {
          withStartSlot: tokens.expandButton.container.leadingSpace,
        },
        trailingSpace: {
          withStartSlot: tokens.expandButton.container.trailingSpace,
        },
      },
      icon: {
        size: tokens.expandButton.icon.size,
      },
      label: {
        color: {
          normal: tokens.expandButton.label.color,
        },
      },
    }),
  },
});

export type IBreadcrumbsThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const breadcrumbsTheme = componentThemeFactory<IBreadcrumbsThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
