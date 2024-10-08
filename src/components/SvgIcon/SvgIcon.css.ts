import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles({
  root: {
    display: 'contents',
  },
});

export type ISvgIconThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const svgIconTheme = componentThemeFactory<ISvgIconThemeFactory>({
  classNames,
  tokens: undefined,
});
