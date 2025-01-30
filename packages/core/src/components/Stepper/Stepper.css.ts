import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './Stepper.constants';

type IModifier = 'orientation' | 'label-position';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
