import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { StandardAside } from '../StandardAside';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier = 'with-header';

const classNames = createStyles({
  root: {
    vars: createTokensVars(StandardAside.theme.tokens, {
      container: {
        topSpace: appLayoutTheme.tokens.header.height,
      },
    }),
  },
});

export type IAppLayoutNavigationRailThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const appLayoutNavigationRailTheme =
  componentThemeFactory<IAppLayoutNavigationRailThemeFactory>({
    classNames,
    tokens: undefined,
  });
