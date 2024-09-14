import { createTheme } from '@vanilla-extract/css';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '~/components/ThemeProvider';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../../PaperBase';

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
    width: 'fit-content',
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
