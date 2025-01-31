import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './ModalAside.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    width: px(360),
    color: themeTokens.colorScheme.surface,
  },
});

const classNames = createStyles({
  root: {
    width: `min(${tokens.container.width}, 100vw - ${px(48)})`,
  },
});

export type IModalAsideThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const modalAsideTheme = componentThemeFactory<IModalAsideThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
