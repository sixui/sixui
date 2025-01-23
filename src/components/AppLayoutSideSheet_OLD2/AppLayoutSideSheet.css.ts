import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { StandardAside } from '../StandardAside';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

const classNames = createStyles({
  standard$withHeader: {
    vars: createTokensVars(StandardAside.theme.tokens, {
      container: {
        topSpace: appLayoutTheme.tokens.header.height,
      },
    }),
  },
});

export type IAppLayoutSideSheetThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const appLayoutSideSheetTheme =
  componentThemeFactory<IAppLayoutSideSheetThemeFactory>({
    classNames,
    tokens: undefined,
  });
