import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'grid' | 'empty';

const [tokensClassName, tokens] = createTheme({
  topSpace: px(space(2)),
  bottomSpace: px(space(2)),
  gap: px(space(0)),
  grid: {
    space: px(space(1)),
    templateColumns: 'unset',
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    color: 'unset',
    outline: 'none',
    paddingLeft: 0,
    paddingRight: 0,
    maxHeight: 'inherit',
  },
  inner: {
    maxHeight: 'inherit',
    borderRadius: 'inherit',
  },
  header: {
    overflow: 'hidden',
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
  },
  content: ({ root }) => ({
    paddingTop: tokens.topSpace,
    paddingBottom: tokens.bottomSpace,
    borderRadius: 'inherit',
    gap: tokens.gap,
    overflow: 'auto',

    selectors: {
      [getModifierSelector<IModifier>('grid', root)]: {
        display: 'grid',
        gridAutoRows: '1fr',
        gap: tokens.grid.space,
        gridTemplateColumns: tokens.grid.templateColumns,
      },

      [getModifierSelector<IModifier>('empty', root)]: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  }),
  footer: {
    overflow: 'hidden',
    borderBottomLeftRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
  },
});

export type IListThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const listTheme = componentThemeFactory<IListThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
