import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { cssLayers } from '~/components/ThemeProvider';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
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
