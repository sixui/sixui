import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

const classNames = createStyles({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `max(${px(themeTokens.density.minTargetSize)}, 100%)`,
    height: `max(${px(themeTokens.density.minTargetSize)}, 100%)`,
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  },
});

export type ITouchTargetThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const touchTargetTheme = componentThemeFactory<ITouchTargetThemeFactory>(
  {
    classNames,
    tokens: undefined,
  },
);
