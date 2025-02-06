import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { px } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './Frame.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    borderRadius: px(themeTokens.shape.corner.lg),
    borderWidth: px(7),
    borderColor: themeTokens.colorScheme.outlineVariant,
  },
});

export type IFrameThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const frameTheme = componentThemeFactory<IFrameThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
