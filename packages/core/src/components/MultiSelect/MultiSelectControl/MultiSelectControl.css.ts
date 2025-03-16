import type { IMultiSelectBaseThemeFactory } from '~/components/MultiSelectBase/MultiSelectBase.css';
import { createStyles } from '~/utils/css/createStyles';
import { multiSelectBaseTheme } from '~/components/MultiSelectBase/MultiSelectBase.css';

export type IMultiSelectControlThemeFactory = IMultiSelectBaseThemeFactory;

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

export const multiSelectControlTheme = multiSelectBaseTheme;
