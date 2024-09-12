import { createTheme, createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { PaperBase } from '../PaperBase';

const [tokensClassName, tokens] = createTheme({
  //
});

const classNames = createStyles({
  root: {
    //
  },
});

export type ITextInputFieldThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const textInputFieldTheme =
  componentThemeFactory<ITextInputFieldThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
