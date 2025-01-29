import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';
import { createTokensVars } from '~/utils/styles/createTokensVars';

type IModifier = 'animation-status';

const [tokensClassName, tokens] = createTheme({
  container: {
    width: px(40),
    marginStart: px(0),
    marginEnd: px(0),
  },
});

const classNames = createStyles({
  root: {
    width: tokens.container.width,
    marginLeft: tokens.container.marginStart,
    marginRight: tokens.container.marginEnd,
  },
});

export type IAnimatedSlotThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const animatedSlotTheme =
  componentThemeFactory<IAnimatedSlotThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
