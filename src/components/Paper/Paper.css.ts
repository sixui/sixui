import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

export type IPaperStyleName = keyof typeof paperTheme;

const classNames = createStyles();

export type IPaperThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const paperTheme = componentThemeFactory<IPaperThemeFactory>({
  classNames,
  tokens: undefined,
});
