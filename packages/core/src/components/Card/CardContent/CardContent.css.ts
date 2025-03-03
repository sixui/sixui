import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './CardContent.constants';

type IModifier = 'disabled';

const DENSITY = px(density({ min: -4, max: 0 }));

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
  leadingSpace: px(space('$lg')),
  trailingSpace: px(space('$lg')),
  topSpace: px(space('$lg')),
  bottomSpace: px(space('$lg')),
});

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: calc.add(px(space('$lg')), DENSITY),
    color: tokens.text.color.normal,
    paddingTop: calc.add(tokens.topSpace, DENSITY),
    paddingBottom: calc.add(tokens.bottomSpace, DENSITY),
    paddingLeft: tokens.leadingSpace,
    paddingRight: tokens.trailingSpace,

    selectors: {
      [modifierSelector<IModifier>('disabled')]: {
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
