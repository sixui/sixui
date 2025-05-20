import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { px } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './TouchTarget.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  width: themeTokens.density.minTargetSize,
  height: themeTokens.density.minTargetSize,
});

const classNames = createStyles({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `max(${px(tokens.width)}, 100%)`,
    height: `max(${px(tokens.height)}, 100%)`,
    transform: 'translate(-50%, -50%)',
  },
});

export type ITouchTargetThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const touchTargetTheme = componentThemeFactory<ITouchTargetThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
