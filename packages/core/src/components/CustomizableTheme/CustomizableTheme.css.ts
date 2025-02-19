import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './CustomizableTheme.constants';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: themeTokens.colorScheme.surfaceContainerLowest,
  },
});

const classNames = createStyles({
  root: {
    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
      },
    }),
  },
  controlBar: {
    padding: px(space(2)),
  },
});

export type ICustomizableThemeThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const customizableThemeTheme =
  componentThemeFactory<ICustomizableThemeThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
