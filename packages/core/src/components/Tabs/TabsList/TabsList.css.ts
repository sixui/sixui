import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './TabsList.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

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
    alignItems: 'flex-end',
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
  tokensClassName,
  tokens,
});
