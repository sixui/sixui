import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
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
