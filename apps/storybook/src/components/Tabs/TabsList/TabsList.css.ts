import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles({
  root: {
    flexDirection: 'column',
    overflow: 'auto',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    position: 'relative',
    display: 'flex',

    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  inner: {
    alignItems: 'end',
    height: '100%',
    overflow: 'inherit',
    justifyContent: 'space-between',
  },
});

export type ITabsListThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const tabsListTheme = componentThemeFactory<ITabsListThemeFactory>({
  classNames,
  tokens: undefined,
});
