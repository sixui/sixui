import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'fixed' | 'center';

const [tokensClassName, tokens] = createTheme({
  container: {
    shape: px(shapeTokens.corner$none),
    filter: 'none',
    color: `color-mix(in srgb, ${themeTokens.colorScheme.scrim} 50%, transparent)`,
  },
});

const classNames = createStyles({
  root: {
    inset: 0,
    position: 'absolute',
    borderRadius: tokens.container.shape,
    backdropFilter: tokens.container.filter,
    backgroundColor: tokens.container.color,

    selectors: {
      [getModifierSelector<IModifier>('fixed')]: {
        position: 'fixed',
      },
      [getModifierSelector<IModifier>('center')]: {
        display: 'grid',
        placeItems: 'center',
      },
    },
  },
});

export type IScrimThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const scrimTheme = componentThemeFactory<IScrimThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
