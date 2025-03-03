import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './Disclosure.constants';

const DENSITY = px(density({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  panelSpacing: px(space('$md')),
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
