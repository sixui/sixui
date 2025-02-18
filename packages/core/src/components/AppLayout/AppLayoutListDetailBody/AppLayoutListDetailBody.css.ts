import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './AppLayoutListDetailBody.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  listPane: {
    height: '100%',
    overflow: 'auto',
  },
  detailPane: {
    height: '100%',
    overflowY: 'auto',
  },
  listDetailPane: {},
});

export type IAppLayoutListDetailBodyThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const appLayoutListDetailBodyTheme =
  componentThemeFactory<IAppLayoutListDetailBodyThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
