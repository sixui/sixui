import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles({
  sm: {
    width: px(240),
  },
  lg: {
    width: px(600),
  },
});

export type IColorSchemeThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const colorSchemeTheme = componentThemeFactory<IColorSchemeThemeFactory>(
  {
    classNames,
    tokens: undefined,
  },
);
