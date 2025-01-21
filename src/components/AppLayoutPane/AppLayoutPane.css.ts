import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getResponsiveContainerQuery } from '~/helpers/styles/getResponsiveContainerQuery';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles({
  root: {
    flexGrow: 1,

    '@container': {
      [getResponsiveContainerQuery({ op: '=', size: 'compact' })]: {
        margin: px(space(4)),
      },
      [getResponsiveContainerQuery({ op: '>=', size: 'medium' })]: {
        margin: px(space(6)),
      },
    },
  },
});

export type IAppLayoutPaneThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const appLayoutPaneTheme =
  componentThemeFactory<IAppLayoutPaneThemeFactory>({
    classNames,
    tokens: undefined,
  });
