import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

const [tokensClassName, tokens] = createTheme({
  container: {
    color: themeTokens.colorScheme.surfaceContainer,
    elevation: elevationLevelPreset[2],
    shape: {
      topLeft: px(themeTokens.shape.corner.xs),
      topRight: px(themeTokens.shape.corner.xs),
      bottomRight: px(themeTokens.shape.corner.xs),
      bottomLeft: px(themeTokens.shape.corner.xs),
    },
  },
  content: {
    maxHeight: px(300),
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: {
          normal: tokens.container.color,
        },
        elevation: {
          normal: tokens.container.elevation,
        },
        shape: tokens.container.shape,
      },
    }),

    position: 'relative',
    flexGrow: 1,
    userSelect: 'none',
    height: 'inherit',
  },
  list: {
    height: '100%',
    overflowY: 'auto',
  },
  listContent: {
    maxHeight: tokens.content.maxHeight,
  },
});

export type IMenuListThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const menuListTheme = componentThemeFactory<IMenuListThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
