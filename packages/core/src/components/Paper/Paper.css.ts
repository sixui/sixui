import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

export type IPaperStyleName = keyof typeof paperTheme;

const [tokensClassName, tokens] = createTheme();

const classNames = createStyles();

export type IPaperThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const paperTheme = componentThemeFactory<IPaperThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
