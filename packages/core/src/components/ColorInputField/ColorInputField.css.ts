import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

const [tokensClassName, tokens] = createTheme();

const classNames = createStyles();

export type IColorInputFieldThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  variant: IFieldBaseVariant;
}>;

export const colorInputFieldTheme =
  componentThemeFactory<IColorInputFieldThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
