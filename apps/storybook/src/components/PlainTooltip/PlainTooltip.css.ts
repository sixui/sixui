import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles({});

export type IPlainTooltipThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const plainTooltipTheme =
  componentThemeFactory<IPlainTooltipThemeFactory>({
    classNames,
    tokens: undefined,
  });
