import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './SvgIcon.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles();

export type ISvgIconThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const svgIconTheme = componentThemeFactory<ISvgIconThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
