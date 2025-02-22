import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './List.constants';

type IModifier = 'grid' | 'empty';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
    display: 'flex',
    flexDirection: 'column',
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
      [modifierSelector<IModifier>('grid', root)]: {
        display: 'grid',
        gridAutoRows: '1fr',
        gap: tokens.grid.space,
        gridTemplateColumns: tokens.grid.templateColumns,
      },

      [modifierSelector<IModifier>('empty', root)]: {
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
