import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './MoveHandleIndicator.constants';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    //

    selectors: {
      [modifierSelector<IModifier>('disabled')]: {
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  },
});

export type IMoveHandleIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const moveHandleIndicatorTheme =
  componentThemeFactory<IMoveHandleIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
