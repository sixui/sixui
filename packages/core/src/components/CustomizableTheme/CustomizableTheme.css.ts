import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './CustomizableTheme.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    minWidth: '100%',
    width: 'max-content',
  },
  controlBar: {},
});

export type ICustomizableThemeThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const customizableThemeTheme =
  componentThemeFactory<ICustomizableThemeThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
