import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

const [tokensClassName, tokens] = createTheme();

const classNames = createStyles();

export type IHslColorPickerContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const hslColorPickerContentTheme =
  componentThemeFactory<IHslColorPickerContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
