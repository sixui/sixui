import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles();

export type IFrameThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const frameTheme = componentThemeFactory<IFrameThemeFactory>({
  classNames,
  tokens: undefined,
});
