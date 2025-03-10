import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './ColorInput.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles();

export type IColorInputThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  variant: IFieldBaseVariant;
}>;

export const colorInputTheme = componentThemeFactory<IColorInputThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
