import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles();

export type IHslColorPickerContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const hslColorPickerContentTheme =
  componentThemeFactory<IHslColorPickerContentThemeFactory>({
    classNames,
    tokens: undefined,
  });
