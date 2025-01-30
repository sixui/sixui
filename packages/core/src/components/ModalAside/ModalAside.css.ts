import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
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
