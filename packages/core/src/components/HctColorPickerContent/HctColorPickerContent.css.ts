import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './HctColorPickerContent.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles();

export type IHctColorPickerContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const hctColorPickerContentTheme =
  componentThemeFactory<IHctColorPickerContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
