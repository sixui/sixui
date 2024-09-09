import { createTheme } from '@vanilla-extract/css';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { space } from '~/helpers/styles/space';
import { px } from '~/helpers/styles/px';

const [tokensClassName, tokens] = createTheme({
  topSpace: px(space(2)),
  bottomSpace: px(space(2)),
  gap: px(space(0)),
  gridSpace: px(space(1)),
});

const classNames = createStyles({
  root: {
    position: 'relative',
    color: 'unset',
    outline: 'none',
    paddingLeft: 0,
    paddingRight: 0,
    maxHeight: 'inherit',
    borderRadius: 'inherit',
  },
  inner: {
    maxHeight: 'inherit',
    borderRadius: 'inherit',
  },
  header: {},
  content: {
    paddingTop: tokens.topSpace,
    paddingBottom: tokens.bottomSpace,
    borderRadius: 'inherit',
    gap: tokens.gap,
  },
  content$empty: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  content$grid: {
    display: 'grid',
    gridAutoRows: '1fr',
    gap: tokens.gridSpace,
  },
  footer: {},
});

export type IListThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const listTheme = componentThemeFactory<IListThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
