import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

const [tokensClassName, tokens] = createTheme();

const classNames = createStyles();

export type IFilterableListThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const filterableListTheme =
  componentThemeFactory<IFilterableListThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
