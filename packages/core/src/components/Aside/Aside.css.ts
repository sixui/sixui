import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './Aside.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  drawer: {},
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
