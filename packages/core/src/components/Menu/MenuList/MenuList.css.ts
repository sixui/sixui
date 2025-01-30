import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './MenuList.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: themeTokens.colorScheme.surfaceContainer,
    elevation: elevationLevelPreset[2],
    shape: px(themeTokens.shape.corner.xs),
  },
  content: {
    maxHeight: px(300),
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
