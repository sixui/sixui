import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IBottomSheetContentVariant } from './BottomSheetContent.types';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    color: themeTokens.colorScheme.surfaceContainerLow,
    elevation: elevationLevelPreset[1],
    shape: themeTokens.shape.corner.xl,
  },
  dragHandle: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    opacity: '0.4',
    width: px(32),
    height: px(4),
    topSpace: px(22),
    bottomSpace: px(22),
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        elevation: tokens.container.elevation,
        shape: tokens.container.shape,
      },
    }),
  },
  dragHandle: {
    paddingTop: tokens.dragHandle.topSpace,
    height: tokens.dragHandle.height,
  },
  closeButton: {
    position: 'absolute',
    right: px(space(2)),
    top: px(space(2)),
  },
});

export type IBottomSheetContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  variant: IBottomSheetContentVariant;
}>;

export const bottomSheetContentTheme =
  componentThemeFactory<IBottomSheetContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });

export const bottomSheetContentThemeVariants = {
  standard: createStyles(),
  minimized: createStyles({
    root: {
      vars: createTokensVars(PaperBase.theme.tokens, {
        container: {
          shape: `${themeTokens.shape.corner.xl} ${themeTokens.shape.corner.xl} ${themeTokens.shape.corner.none} ${themeTokens.shape.corner.none}`,
        },
      }),
    },
  }),
};
