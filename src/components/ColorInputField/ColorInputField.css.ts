import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IFieldBaseVariant } from '../FieldBase';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles();

export type IColorInputFieldThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  variant: IFieldBaseVariant;
}>;

export const colorInputFieldTheme =
  componentThemeFactory<IColorInputFieldThemeFactory>({
    classNames,
    tokens: undefined,
  });
