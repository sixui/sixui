import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './Aside.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

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
