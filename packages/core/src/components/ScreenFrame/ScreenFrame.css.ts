import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './ScreenFrame.constants';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  frame: {
    borderRadius: px(themeTokens.shape.corner.lg),
    borderWidth: px(7),
    borderColor: themeTokens.colorScheme.outlineVariant,
  },
  handleRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -7,
  },
  handleBottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -7,
  },
});

export type IScreenFrameThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const screenFrameTheme = componentThemeFactory<IScreenFrameThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
