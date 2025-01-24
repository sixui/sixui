import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

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
    tokens: undefined,
  });
