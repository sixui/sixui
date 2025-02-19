import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
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
