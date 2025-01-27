import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

type IModifier = 'orientation' | 'label-position';

const [tokensClassName, tokens] = createTheme({
  connector: {
    space: px(space(2)),
  },
});

const classNames = createStyles({
  root: {
    display: 'flex',
    flexGrow: 1,

    selectors: {
      [getModifierSelector<IModifier>({ orientation: 'horizontal' })]: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      [getModifierSelector<IModifier>({ orientation: 'vertical' })]: {
        flexDirection: 'column',
      },
      [getModifierSelector<IModifier>({ 'label-position': 'bottom' })]: {
        alignItems: 'flex-start',
      },
    },
  },
});

export type IStepperThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
  tokens: typeof tokens;
}>;

export const stepperTheme = componentThemeFactory<IStepperThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
