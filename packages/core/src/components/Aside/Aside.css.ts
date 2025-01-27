import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

const [tokensClassName, tokens] = createTheme();

const classNames = createStyles({
  modal: {},
  standard: {},
});

export type IAsideThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const asideTheme = componentThemeFactory<IAsideThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
