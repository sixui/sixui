import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles({});

export type IRichTooltipThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const richTooltipTheme = componentThemeFactory<IRichTooltipThemeFactory>(
  {
    classNames,
    tokens: undefined,
  },
);