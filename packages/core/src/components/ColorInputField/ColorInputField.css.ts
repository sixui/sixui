import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './ColorInputField.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

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
