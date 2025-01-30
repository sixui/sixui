import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './CardContent.constants';

type IModifier = 'disabled';

const DENSITY = px(getDensity({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
    display: 'flex',
    flexDirection: 'column',
    gap: calc.add(px(space(4)), DENSITY),
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
