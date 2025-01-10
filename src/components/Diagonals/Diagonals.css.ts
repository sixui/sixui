import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  color: themeTokens.colorScheme.outlineVariant,
});

const classNames = createStyles({
  root: {
    overflow: 'hidden',
    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
  },
  line: {
    stroke: tokens.color,
    strokeWidth: px(1),
    vectorEffect: 'non-scaling-stroke',
  },
});

export type IDiagonalsThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const diagonalsTheme = componentThemeFactory<IDiagonalsThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
