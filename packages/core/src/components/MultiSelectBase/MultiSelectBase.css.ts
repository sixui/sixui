import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './MultiSelectBase.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  chip: {
    marginRight: px(4),
  },
});

export type IMultiSelectBaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const multiSelectBaseTheme =
  componentThemeFactory<IMultiSelectBaseThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
