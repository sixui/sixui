import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './AppLayoutSupportingPaneBody.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles();

export type IAppLayoutSupportingPaneBodyThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const appLayoutSupportingPaneBodyTheme =
  componentThemeFactory<IAppLayoutSupportingPaneBodyThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
