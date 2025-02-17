import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { px, space } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { appLayoutTheme } from '../AppLayout.css';
import { COMPONENT_NAME } from './AppLayoutListDetailBody.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  listPane: {
    height: calc.subtract(
      '100vh',
      appLayoutTheme.tokens.topBar.height,
      calc.multiply(px(space(6)), 2),
    ),
    overflow: 'auto',
  },
  detailPane: {
    height: calc.subtract(
      '100vh',
      appLayoutTheme.tokens.topBar.height,
      calc.multiply(px(space(6)), 2),
    ),
    overflowY: 'auto',
  },
  listDetailPane: {
    //
  },
});

export type IAppLayoutListDetailBodyThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const appLayoutListDetailBodyTheme =
  componentThemeFactory<IAppLayoutListDetailBodyThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
