import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './Paper.constants';

export type IPaperStyleName = keyof typeof paperTheme;

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles();

export type IPaperThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const paperTheme = componentThemeFactory<IPaperThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
