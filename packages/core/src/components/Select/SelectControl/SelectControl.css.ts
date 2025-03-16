import type { ISelectBaseThemeFactory } from '~/components/SelectBase/SelectBase.css';
import { createStyles } from '~/utils/css/createStyles';
import { selectBaseTheme } from '~/components/SelectBase/SelectBase.css';

export type ISelectControlThemeFactory = ISelectBaseThemeFactory;

export const classNames = createStyles({
  input: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    pointerEvents: 'none',
    opacity: 0,
  },
});

export const selectControlTheme = selectBaseTheme;
