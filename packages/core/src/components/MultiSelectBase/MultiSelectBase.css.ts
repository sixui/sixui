import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

const [tokensClassName, tokens] = createTheme();

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
