import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './Disclosure.constants';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  panelSpacing: px(space(3)),
});

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  panel: {
    marginTop: calc.add(tokens.panelSpacing, DENSITY),
  },
});

export type IDisclosureThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const disclosureTheme = componentThemeFactory<IDisclosureThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
