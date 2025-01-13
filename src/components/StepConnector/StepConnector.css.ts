import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'orientation' | 'label-position';

// FIXME:
const thickness = '1px';
const topSpace = '8px';
const leadingSpace = '8px';
const stepIndicatorSize = '24px';

const classNames = createStyles({
  root: {
    selectors: {
      [getModifierSelector<IModifier>({
        orientation: 'horizontal',
      })]: {
        flexDirection: 'row',
      },
      [getModifierSelector<IModifier>({
        orientation: 'horizontal',
        'label-position': 'bottom',
      })]: {
        marginTop: calc.add(
          calc.negate(calc.divide(thickness, 2)),
          topSpace,
          calc.divide(stepIndicatorSize, 2),
        ),
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
      })]: {
        flexDirection: 'column',
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        'label-position': 'right',
      })]: {
        marginLeft: calc.add(
          calc.negate(calc.divide(thickness, 2)),
          leadingSpace,
          calc.divide(stepIndicatorSize, 2),
        ),
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        'label-position': 'bottom',
      })]: {
        // This style is never applied because the vertical orientation does not
        // support bottom label.
      },
    },
  },
});

export type IStepConnectorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const dividerTheme = componentThemeFactory<IStepConnectorThemeFactory>({
  classNames,
  tokens: undefined,
});
