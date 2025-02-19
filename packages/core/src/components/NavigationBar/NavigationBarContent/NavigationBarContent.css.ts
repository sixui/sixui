import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './NavigationBarContent.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: themeTokens.colorScheme.surface,
    shape: themeTokens.shape.corner.none,
    height: px(80),
    elevation: elevationLevelPreset[0],
  },
});

const classNames = createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: tokens.container.height,
    paddingTop: px(12),
    paddingBottom: px(16),
    gap: px(8),

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        shape: tokens.container.shape,
        elevation: tokens.container.elevation,
      },
    }),
  },
});

export type INavigationBarContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const navigationBarContentTheme =
  componentThemeFactory<INavigationBarContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
