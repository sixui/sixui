import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { density, px } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './Checkbox.constants';

const DENSITY = px(density({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  labelAndActionContainer: {
    marginTop: calc.add(px(0), calc.divide(DENSITY, 2)),
  },
});

export type ICheckboxThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const checkboxTheme = componentThemeFactory<ICheckboxThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
