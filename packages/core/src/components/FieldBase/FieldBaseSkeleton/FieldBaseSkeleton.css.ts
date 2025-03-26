import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createStyles } from '~/utils/css';
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
    flexBasis: '0%',
    maxWidth: '100%',
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
