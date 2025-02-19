import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
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
    vars: overrideTokens(PaperBase.theme.tokens, {
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
