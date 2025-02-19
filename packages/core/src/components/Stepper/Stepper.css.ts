import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
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
      [modifierSelector<IModifier>({ orientation: 'horizontal' })]: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      [modifierSelector<IModifier>({ orientation: 'vertical' })]: {
        flexDirection: 'column',
      },
      [modifierSelector<IModifier>({ 'label-position': 'bottom' })]: {
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
