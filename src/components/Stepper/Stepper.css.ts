import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'orientation' | 'label-position';

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
}>;

export const stepperTheme = componentThemeFactory<IStepperThemeFactory>({
  classNames,
  tokens: undefined,
});
