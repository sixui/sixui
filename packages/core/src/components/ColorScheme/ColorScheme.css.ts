import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './ColorScheme.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

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
    tokensClassName,
    tokens,
  },
);
