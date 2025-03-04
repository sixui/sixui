import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './CustomizableTheme.constants';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: themeTokens.colorScheme.surfaceContainerLowest,
  },
});

const classNames = createStyles({
  root: {
    minWidth: '100%',
    width: 'max-content',

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
      },
    }),
  },
  controlBar: {},
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
