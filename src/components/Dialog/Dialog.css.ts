import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

const classNames = createStyles({
  root: {
    position: 'fixed',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    overflow: 'auto',
    zIndex: themeTokens.zIndex.modal,
  },
});

export type IDialogThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const dialogTheme = componentThemeFactory<IDialogThemeFactory>({
  classNames,
  tokens: undefined,
});
