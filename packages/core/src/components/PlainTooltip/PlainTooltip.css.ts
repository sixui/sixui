import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

const [tokensClassName, tokens] = createTheme();

const classNames = createStyles({});

export type IPlainTooltipThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const plainTooltipTheme =
  componentThemeFactory<IPlainTooltipThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
