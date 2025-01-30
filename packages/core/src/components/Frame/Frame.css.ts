import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './Frame.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles();

export type IFrameThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const frameTheme = componentThemeFactory<IFrameThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
