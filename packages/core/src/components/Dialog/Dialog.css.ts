import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

const [tokensClassName, tokens] = createTheme();

const classNames = createStyles({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'visible',
  },
});

export type IDialogThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const dialogTheme = componentThemeFactory<IDialogThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
