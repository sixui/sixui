import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createStyles, overrideTokens, px } from '~/utils/css';
import { themeTokens } from '~/components/Theme/theme.css';
import { fieldBaseTheme } from '../FieldBase.css';

const tokensClassName = fieldBaseTheme.tokensClassName;
const tokens = fieldBaseTheme.tokens;

const classNames = createStyles({
  root: {
    height: tokens.minHeight,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: '100%',

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        shape: `${px(themeTokens.shape.corner.xs)} ${px(themeTokens.shape.corner.xs)} 0 0`,
      },
    }),
  },
});

export type IFieldBaseSkeletonThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const fieldBaseSkeletonTheme =
  componentThemeFactory<IFieldBaseSkeletonThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
