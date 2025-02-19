import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { density, px } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './Radio.constants';

const DENSITY = px(density({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  content: {
    alignSelf: 'start',
    marginTop: calc.divide(DENSITY, -2),
  },
});

export type IRadioThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const radioTheme = componentThemeFactory<IRadioThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
