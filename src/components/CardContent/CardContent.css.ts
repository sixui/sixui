import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'disabled';

const DENSITY = px(getDensity({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  text: {
    color: {
      normal: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  leadingSpace: px(space(4)),
  trailingSpace: px(space(4)),
  topSpace: px(space(4)),
  bottomSpace: px(space(4)),
});

const classNames = createStyles({
  root: {
    color: tokens.text.color.normal,
    paddingTop: calc.add(tokens.topSpace, DENSITY),
    paddingBottom: calc.add(tokens.bottomSpace, DENSITY),
    paddingLeft: tokens.leadingSpace,
    paddingRight: tokens.trailingSpace,

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        color: tokens.text.color.disabled,
        opacity: tokens.text.opacity.disabled,
      },
    },
  },
});

export type ICardContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const CardContentTheme = componentThemeFactory<ICardContentThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
