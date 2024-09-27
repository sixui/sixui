import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const [tokensClassName, tokens] = createTheme({
  container: {
    color: 'unset',
  },
  label: {
    color: 'black',
  },
});

const classNames = createStyles({
  root: {
    backgroundColor: tokens.container.color,
    color: tokens.label.color,
    padding: px(space(2)),
  },
});

export type ITestThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const testTheme = componentThemeFactory<ITestThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
