import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { ISideSheetContentVariant } from './SideSheetContent.types';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'anchor';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    color: themeTokens.colorScheme.surface,
    shape: themeTokens.shape.corner.none,
    elevation: elevationLevelPreset[0],
  },
  header: {
    height: px(64),
    leadingSpace: {
      normal: px(space(6)),
      withIcons: px(space(6)),
    },
    trailingSpace: px(space(6)),
  },
  headline: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.title.lg,
  },
  divider: {
    width: themeTokens.outline.width.xs,
    color: themeTokens.colorScheme.outline,
  },
  topElements: {
    gap: px(space(3)),
  },
  bottomActions: {
    height: px(72),
    topSpace: px(space(4)),
    bottomSpace: px(space(6)),
    gap: px(space(6)),
  },
  content: {
    topSpace: px(space(4)),
    bottomSpace: px(space(4)),
  },
});

const classNames = createStyles({
  root: {
    flexShrink: 0,

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        shape: tokens.container.shape,
        elevation: tokens.container.elevation,
      },
    }),
  },
});

export type ISideSheetContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: ISideSheetContentVariant;
}>;

export const sideSheetContentTheme =
  componentThemeFactory<ISideSheetContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });

export const sideSheetContentThemeVariants = {
  standard: createStyles(),
  modal: createStyles(),
  detachedModal: createStyles(),
};
