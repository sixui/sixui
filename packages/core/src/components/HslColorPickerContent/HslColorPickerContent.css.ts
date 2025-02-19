import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './HslColorPickerContent.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

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
